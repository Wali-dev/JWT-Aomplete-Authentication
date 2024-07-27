# JWT Authentication API

This is a Node.js application that provides JWT (JSON Web Token) based authentication API. It includes user registration, login, password change, and password reset functionalities.

## Features

- User Registration
- User Login
- Change Password (for authenticated users)
- Password Reset via Email
- Get Logged User Information

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JSON Web Tokens (JWT)
- Bcrypt (for password hashing)
- Nodemailer (for sending emails)

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB

## Installation

1. Clone the repository: ```bash git clone <repository-url> ```
2. Install dependencies: ```bash npm install ```
3. Create a `.env` file in the root directory and add the following environment variables:
    ```bash Here's a README file for your application:
markdownCopy# JWT Authentication API

This is a Node.js application that provides JWT (JSON Web Token) based authentication API. It includes user registration, login, password change, and password reset functionalities.

## Features

- User Registration
- User Login
- Change Password (for authenticated users)
- Password Reset via Email
- Get Logged User Information

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JSON Web Tokens (JWT)
- Bcrypt (for password hashing)
- Nodemailer (for sending emails)

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

3. Install dependencies:
```bash
npm install

 ```
5. Create a `.env` file in the root directory and add the following environment variables:
```bash
jwt_key=<your-jwt-secret-key>
EMAIL_FROM=<your-email-address>
EMAIL_HOST=<your-email-host>
EMAIL_PORT=<your-email-port>
EMAIL_USER=<your-email-username>
EMAIL_PASS=<your-email-password>

```
## Usage

4. To start the server in development mode:
```bash npm run dev```
5. To start the server in production mode:
```bash npm start```


## API Endpoints

### Public Routes

- `POST /api/user/`: User registration
- `GET /api/user/`: User login
- `POST /api/user/send-reset-password-email`: Send password reset email
- `POST /api/user/reset-password/:id/:token`: Reset password

### Private Routes (require authentication)

- `POST /api/user/changepassword`: Change password
- `GET /api/user/loggeduser`: Get logged user information

## Authentication

This API uses JWT for authentication. To access protected routes, include the JWT token in the Authorization header of your request:
```bash Authorization: Bearer <your-jwt-token>```

## Error Handling

The API uses a centralized error handling middleware. All errors are passed to this middleware using `next(error)`.

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

   
