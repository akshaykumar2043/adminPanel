import express from 'express';
import adminController from "../Controllers/adminController.js";
import {authMiddleware} from"../middleware/auth-middleware.js";

 const adminrouter = express.Router();
 
//   adminrouter.use(bodyParser.json());

// adminrouter.use(express.urlencoded({ extended: false }));





// adminrouter.get()
adminrouter.get("/users",authMiddleware , adminController.getAllUsers);
adminrouter.get("/users/:id",authMiddleware , adminController.getUserById);
adminrouter.patch("/users/update/:id",authMiddleware , adminController.updateUserById);
adminrouter.delete("/users/delete/:id",authMiddleware , adminController.deleteUserById);
adminrouter.get("/contacts",authMiddleware, adminController.getAllContacts);
adminrouter.get("/contacts/:id",authMiddleware , adminController.getContactById);
adminrouter.delete("/contacts/delete/:id",authMiddleware, adminController.deleteContactById);
export default {adminrouter};