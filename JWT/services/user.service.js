import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRegistrationService = async (name, email, password, password_confirmation, tc) => {
    const user = await UserModel.findOne({ email: email });
    if (user) {
        res.send({ "status": "failed", "message": "Email already used" })
    }
    else {
        if (name && email && password && password_confirmation && tc) {
            if (password === password_confirmation) {
                try {
                    const salt = await bcrypt.genSalt(7);
                    const hassedPassword = await bcrypt.hash(password, salt);
                    const user = new UserModel({
                        name: name,
                        email: email,
                        password: hassedPassword,
                        tc: tc,
                    })
                    await user.save();
                    res.send(user);

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
}

export { userRegistrationService };