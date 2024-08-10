## register (Register a new user)
**Endpoint:** `/api/auth/register`  
**Method:** `POST`  
**Header:** `null`

### Request Body
- **name** (String, **REQUIRED**): User's name.
- **address** (String, **REQUIRED**): User's address.
- **city** (String, **REQUIRED**): User's city.
- **country** (String, **REQUIRED**): User's country.
- **phone** (String, **REQUIRED**): User's phone number.
- **password** (String, **REQUIRED**): User's password.
- **email** (String, **REQUIRED**): User's email address.

### Responses
- **201 - Created**
    ```json
    {
      "status": "success",
      "data": {
        "message": "User registered successfully"
      },
      "hasData": true
    }
    ```

- **400 - Bad Request**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Email already exists"
      },
      "hasData": false
    }
    ```

---

## tokenValidate (Validate token)
**Endpoint:** `/api/auth/tokenValidate`  
**Method:** `GET`  
**Header:** `Authorization: Bearer <token>`

### Request Body
- **null**

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Token is valid"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Access denied"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Invalid token"
      },
      "hasData": false
    }
    ```

---

## login (User login)
**Endpoint:** `/api/auth/login`  
**Method:** `POST`  
**Header:** `null`

### Request Body
- **email** (String, **REQUIRED**): User's email address.
- **password** (String, **REQUIRED**): User's password.

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Login successful",
        "role": "user", 
        "isAdmin": false, 
        "token": "<jwt_token>"
      },
      "hasData": true
    }
    ```

- **401 - Unauthorized**
    ```json
    {
      "status": "error",
      "data": {
        "message": "No user founded with this credentials"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Invalid password"
      },
      "hasData": false
    }
    ```

- **500 - Internal Server Error**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Internal server error"
      },
      "hasData": false
    }
    ```

---

## googleLogin (Google login redirect)
**Endpoint:** `/api/auth/googleLogin`  
**Method:** `GET`  
**Header:** `null`

### Request Body
- **null**

### Responses
- **302 - Found**
    - Redirects to Google OAuth2 authorization endpoint.

---

## googleLoginCallback (Google login callback)
**Endpoint:** `/api/auth/googleLogin`  
**Method:** `GET`  
**Header:** `null`

### Request Body
- **null**

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Google login successfull",
        "role": "user",
        "token": "<jwt_token>"
      },
      "hasData": true
    }
    ```

- **302 - Found**
    - Redirects to login page on error.

---

## googleData (Google login data)
**Endpoint:** `/api/auth/googleData`  
**Method:** `POST`  
**Header:** `null`

### Request Body
- **profile** (Object, **REQUIRED**): Google user profile data.

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Google login successfull",
        "profile": {
          // Google user profile data
        }
      },
      "hasData": true
    }
    ```

---

## logout (Logout user)
**Endpoint:** `/api/auth/logout`  
**Method:** `POST`  
**Header:** `Authorization: Bearer <token>`

### Request Body
- **null**

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Logged out successfully"
      },
      "hasData": false
    }
    ```

---

## changePassword (Change user password)
**Endpoint:** `/api/auth/changePassword`  
**Method:** `POST`  
**Header:** `Authorization: Bearer <token>`

### Request Body
- **oldPassword** (String, **REQUIRED**): User's current password.
- **newPassword** (String, **REQUIRED**): User's new password.

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Password changed successfully"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Invalid password"
      },
      "hasData": false
    }
    ```

- **404 - Not Found**
    ```json
    {
      "status": "error",
      "data": {
        "message": "User not found"
      },
      "hasData": false
    }
    ```

---

## deleteAccount (Delete user account)
**Endpoint:** `/api/auth/deleteAccount`  
**Method:** `POST`  
**Header:** `Authorization: Bearer <token>`

### Request Body
- **password** (String, **REQUIRED**): User's password.

### Responses
- **200 - OK**
    ```json
    {
      "status": "success",
      "data": {
        "message": "Account deleted successfully"
      },
      "hasData": false
    }
    ```

- **401 - Unauthorized**
    ```json
    {
      "status": "error",
      "data": {
        "message": "Invalid password"
      },
      "hasData": false
    }
    ```

- **404 - Not Found**
    ```json
    {
      "status": "error",
      "data": {
        "message": "User not found"
      },
      "hasData": false
    }
    ```

---
