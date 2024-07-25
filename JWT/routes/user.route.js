import express from 'express';
import UserController from '../controllers/user.controller.js';
import checkUserAuth from '../middleware/auth.middleware.js';

const router = express.Router();

//Public Routes
router.post("/", UserController.userRegistration);
router.get("/", UserController.userLogin);

//Route level middleware
router.use('/changepassword', checkUserAuth);
router.use('/loggeduser', checkUserAuth);

//Private Routes
router.post("/changepassword", UserController.changePassword);
router.get("/loggeduser", UserController.getLoggedUser);



export default router;