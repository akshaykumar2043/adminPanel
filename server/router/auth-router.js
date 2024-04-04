import express from'express';



import bodyParser from "body-parser";
import userController from "../Controllers/userController.js";
import {signup,login} from"../validator/validator.js";
// import login from"../validator/validator.js";
import {validate} from '../middleware/validate.js';
import {authMiddleware} from "../middleware/auth-middleware.js";
const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));



// Define the route for registering a user
router.post('/register',validate(signup), userController.register);
router.post("/login",validate(login),userController.logIn);
router.get("/user",authMiddleware, userController.user);
export default {router};
