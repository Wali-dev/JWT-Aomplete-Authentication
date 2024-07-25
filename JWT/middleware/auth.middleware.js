import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_KEY = process.env.jwt_key;

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = authorization.split(' ')[1];

            //Verify Token
            const { userID } = jwt.verify(token, JWT_KEY);

            //Get user by token
            req.user = await UserModel.findById(userID).select("-password");
            next()
        } catch (error) {
            console.log(error);
            res.staus(401).send({ "status": "failed", "message": "Unauth user" })
        }
    }
    if (!token) {
        res.send({ "status": "failed", "message": "Token is required" })
    }
}

export default checkUserAuth;