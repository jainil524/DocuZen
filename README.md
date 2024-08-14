## Register (Create a new user)
**Endpoint:** `/api/auth/register`  
**Method:** `POST`  
**Header:** `null`

### Request Body
- **name** (String, REQUIRED): The user's full name.
- **address** (String, REQUIRED): The user's address.
- **city** (String, REQUIRED): The user's city.
- **country** (String, REQUIRED): The user's country.
- **phone** (String, REQUIRED): The user's phone number.
- **password** (String, REQUIRED): The user's password.
- **email** (String, REQUIRED): The user's email address.

### Responses
- **201 - Created**
    ```js
    {
      "status": "success",
      "data": {
        "message": "User registered successfully"
      },
      "hasData": true
    }
    ```

- **400 - Bad Request**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Email already exists"
      },
      "hasData": false
    }
    ```

---

## Login (Authenticate user)
**Endpoint:** `/api/auth/login`  
**Method:** `POST`  
**Header:** `null`

### Request Body
- **email** (String, REQUIRED): The user's email address.
- **password** (String, REQUIRED): The user's password.

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Login successful",
        "role": "user",
        "isAdmin": false,
        "token": "JWT_TOKEN"
      },
      "hasData": true
    }
    ```

- **401 - Unauthorized**
    ```js
    {
      "status": "error",
      "data": {
        "message": "No user founded with this credentials" 
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Invalid password"
      },
      "hasData": false
    }
    ```

- **500 - Internal Server Error**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Internal server error"
      },
      "hasData": false
    }
    ```

---

## Token Validate (Validate JWT token)
**Endpoint:** `/api/auth/tokenValidate`  
**Method:** `GET`  
**Header:** `Authorization: Bearer JWT_TOKEN`

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Token is valid"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Access denied"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Invalid token"
      },
      "hasData": false
    }
    ```

---

## Logout (Log out user)
**Endpoint:** `/api/auth/logout`  
**Method:** `POST`  
**Header:** `Authorization: Bearer JWT_TOKEN`

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Logged out successfully"
      },
      "hasData": false
    }
    ```

---

## Google Login (Initiate Google login)
**Endpoint:** `/api/auth/googleLogin`  
**Method:** `GET`  
**Header:** `null`

### Responses
- **302 - Found**
  - Redirects to Google OAuth2 authorization page.

---

## Google Login Callback (Handle Google login callback)
**Endpoint:** `/api/auth/googleLogin`  
**Method:** `GET`  
**Header:** `null`

### Request Body
- **code** (String, REQUIRED): The authorization code received from Google.

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Google login successfull",
        "role": "user",
        "token": "JWT_TOKEN"
      },
      "hasData": true
    }
    ```

- **302 - Found**
  - Redirects to login page on error.

---

## Google Data (Get Google profile data)
**Endpoint:** `/api/auth/googleData`  
**Method:** `POST`  
**Header:** `Authorization: Bearer JWT_TOKEN`

### Request Body
- **profile** (Object, REQUIRED): The Google profile data.

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Google login successfull",
        "profile": { /* Google profile data */ }
      },
      "hasData": true
    }
    ```

---

## Change Password (Update user's password)
**Endpoint:** `/api/auth/changePassword`  
**Method:** `POST`  
**Header:** `Authorization: Bearer JWT_TOKEN`

### Request Body
- **oldPassword** (String, REQUIRED): The user's current password.
- **newPassword** (String, REQUIRED): The user's new password.

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Password changed successfully"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Invalid password"
      },
      "hasData": false
    }
    ```

- **404 - Not Found**
    ```js
    {
      "status": "error",
      "data": {
        "message": "User not found"
      },
      "hasData": false
    }
    ```

---

## Delete Account (Delete user account)
**Endpoint:** `/api/auth/deleteAccount`  
**Method:** `DELETE`  
**Header:** `Authorization: Bearer JWT_TOKEN`

### Request Body
- **password** (String, REQUIRED): The user's current password.

### Responses
- **200 - OK**
    ```js
    {
      "status": "success",
      "data": {
        "message": "Account deleted successfully"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```js
    {
      "status": "error",
      "data": {
        "message": "Invalid password"
      },
      "hasData": false
    }
    ```

- **404 - Not Found**
    ```js
    {
      "status": "error",
      "data": {
        "message": "User not found"
      },
      "hasData": false
    }
    ```

--- 
