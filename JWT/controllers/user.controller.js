import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_KEY = process.env.jwt_key;

// import { userRegistrationService } from '../services/user.service.js'


class UserController {
    static userRegistration = async (req, res) => {
        try {
            // const user = await userRegistrationService(name, email, password, password_confirmation, tc);
            // res.send(user)
            const { name, email, password, password_confirmation, tc } = req.body;
            const user = await UserModel.findOne({ email: email });
            if (user) {
                res.send({ "status": "failed", "message": "Email already used" })
            }
            else {
                if (name && email && password && password_confirmation && tc) {
                    if (password === password_confirmation) {
                        try {
                            const salt = await bcrypt.genSalt(7);
                            const hashedPassword = await bcrypt.hash(password, salt);
                            const user = new UserModel({
                                name: name,
                                email: email,
                                password: hashedPassword,
                                tc: tc,
                            })
                            await user.save();
                            const savedUser = await UserModel.findOne({ email: email });

                            //generate JWT TOKEN
                            const token = jwt.sign({ userID: savedUser._id }, JWT_KEY, { expiresIn: '1d' });
                            res.status(201).send({ "status": "Success", "message": "Registration Successfull", "token": token })

                        } catch (error) {
                            console.log(error);
                            res.send({ "status": "failed", "message": "Unable to register" })
                        }
                    }
                    else {
                        res.send({ "status": "failed", "message": "Password must match" })
                    }
                }
                else {
                    res.send({ "status": "failed", "message": "All fields are rewuired" })
                }
            }
        } catch (error) {
            res.send({ "status": "failed", "message": "Unable to register" })
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {

                        //generate JWT TOKEN
                        const token = jwt.sign({ userID: user._id }, JWT_KEY, { expiresIn: '1d' });
                        res.send({ "status": "Success", "message": "Login is Succesfull", "token": token });
                    } else {
                        res.send({ "status": "failed", "message": "Email or password does not match" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "User do not exists" })
                }
            } else {
                res.send({ "status": "failed", "message": "Email and Password both are required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to login" })
        }
    }

    static changePassword = async (req, res, next) => {
        try {
            const { password, password_confirmation } = req.body;
            if (password && password_confirmation) {
                if (password === password_confirmation) {
                    const salt = await bcrypt.genSalt(7);
                    const newHashedPassword = await bcrypt.hash(password, salt);
                    await UserModel.findByIdAndUpdate(req.user._id, {
                        $set: {
                            password: newHashedPassword
                        }
                    })
                    res.send({ "status": "Success", "message": "Passwords changed succesfully" })
                } else {
                    res.send({ "status": "failed", "message": "Passwords must match" })
                }
            } else {
                res.send({ "status": "failed", "message": "Both fields are required" })
            }
        } catch (error) {
            console.log(error)
        }

    }

    static getLoggedUser = async (req, res) => {
        try {
            res.status.send({ "user": req.user })

        } catch (error) {

        }
    }

}

export default UserController;