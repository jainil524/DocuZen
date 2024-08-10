import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import axios from 'axios';

import generateUUID from '../../utils/generateUUID.js';

import dbConnect from '../../models/dbconnect.js';
import User from "../../models/user/user.model.js";

dotenv.config();
dbConnect();

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { name, password, email } = req.body;
    const emptySetOfValues = [null, undefined, ''];
    if (emptySetOfValues.includes(name) || emptySetOfValues.includes(password) || emptySetOfValues.includes(email)) {
        res.json({ status: "error", data: { message: 'Please fill all the required fields' }, hasData: false });
        return;
    } else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        // Check email validation
        res.json({ status: "error", data: { message: 'Invalid email format' }, hasData: false });
        return;
    } else if (password.length < 6) {
        // Check password length must be greater than 6
        res.json({ status: "error", data: { message: 'Password must be at least 6 characters long' }, hasData: false });
        return;
    } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
        // Check password must contain one lowercase, one uppercase, one special character, and be at least 6 characters long
        res.json({ status: "error", data: { message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character' }, hasData: false });
        return;
    }

    const user = { name, password, email, role: "user" };

    let result = await createUser(user);
    if (result.status === "error") {
        return res.status(400).json(result);
    }

    return res.status(201).json({ status: "success", data: { message: 'User registered successfully' }, hasData: true });
});

// Validate token
const tokenValidate = asyncHandler(async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: "error", data: { message: 'Access denied' }, hasData: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['RS256'] });
        if (decoded)
            return res.status(200).json({ status: "success", data: { message: 'Token is valid' }, hasData: false });
    } catch (e) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid token' }, hasData: false });
    }
});

// Login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ status: "error", data: { message: 'Please fill all the required fields' }, hasData: false });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User not found with is email: ${email}`);
            return res.status(401).json({ status: "error", data: { message: 'No user founded with this credentials' }, hasData: false });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (!isPasswordSame) {
            console.log(`Invalid password for user with this email: ${email}`);
            return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
        }

        const isAdmin = user.role == 'admin';

        console.log(user);

        const token = generateJWTToken(user);
        res.json({ status: "success", data: { message: 'Login successful', role: user.role, isAdmin: isAdmin, token: token }, hasData: true });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: "error", data: { message: 'Internal server error' }, hasData: false });
    }
});

const googleLogin = asyncHandler(async (req, res) => {
    // Google login logic here
    const CLIENT_ID = '332800489479-i9p7clk0s97nnmvpnvcm1gqqtvg56svf.apps.googleusercontent.com';
    const REDIRECT_URI = 'http://localhost:3000/api/auth/googleLogin';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
});

const googleLoginCallback = asyncHandler(async (req, res) => {
    const CLIENT_ID = '332800489479-i9p7clk0s97nnmvpnvcm1gqqtvg56svf.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'http://localhost:3000/api/auth/googleLogin';
    const { code } = req.query;

    try {
        const { data } = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: 'post',
            data: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
                code,
            },
        });

        const { access_token, id_token } = data;

        // Use access_token or id_token to fetch user profile
        const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        console.log(profile);

        // Check if user already exists in database by email
        let user = await User.findOne({ email: profile.email });

        if (!user) {
            // User does not exist, create a new user record
            user = await createUser({ name: profile.name, email: profile.email, profileImage: profile.picture, googleId: profile.id });
        }

        if (user.googleId != null) {
            const token = generateJWTToken(user);
            // Generate JWT token for user authentication
            res.cookie('token', token, { httpOnly: true });
            res.redirect("http://localhost:5173/");
            // { status: "success", data: { message: 'Google login successfull', role: user.role, token: token }, hasData: true });
        }
        console.log(user);
    } catch (error) {
        console.error('Error:', error); // Log the error message for debugging
        res.redirect('/login'); // Redirect to login page on error  
    }
});

const googleData = asyncHandler(async (req, res) => {
    const { profile } = req.body;
    console.log(profile);
    return res.json({ status: "success", data: { message: 'Google login successfull', profile: profile }, hasData: true });
});

// Logout user
const logout = asyncHandler(async (req, res) => {
    // Invalidate token logic here (if using token blacklist)


    return res.status(200).json({ status: "success", data: { message: 'Logged out successfully' }, hasData: false });
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    console.log(req.user);

    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ status: "error", data: { message: "User not found" }, hasData: false });

    const isPasswordSame = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordSame) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ status: "success", data: { message: "Password changed successfully" }, hasData: false });
});

const deleteAccount = asyncHandler(async (req, res) => {
    const { password } = req.body;

    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ status: "error", data: { message: "User not found" }, hasData: false });

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame) {
        return res.status(401).json({ status: "error", data: { message: 'Invalid password' }, hasData: false });
    }

    await user.remove();

    return res.json({ status: "success", data: { message: "Account deleted successfully" }, hasData: false });
});

const generateJWTToken = (user) => {
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role, id: user.userid, mainid: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
};

const invalidateToken = (token) => {
    // Logic to invalidate token

};

const createUser = async ({ name, role, password, googleId, email }) => {
    let userid = generateUUID();
    let isUnique = false;


    do {
        let isUserIDUnique = await User.findOne({ userid });
        if (!isUserIDUnique) {
            isUnique = true;
        } else {
            userid = generateUUID();
        }

    } while (isUnique != true);

    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
        return { status: "error", data: { message: 'Email already exists' }, hasData: false };
    }
    else if (googleId) {
        const user = new User({ userid, name, email, role, googleId });
        return user.save();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ userid, name, email, password: hashedPassword, role, email });
    return user.save();
}


export {
    register,
    login,
    logout,
    googleLoginCallback,
    googleLogin,
    tokenValidate,
    changePassword,
    deleteAccount,
    googleData,
    createUser
};