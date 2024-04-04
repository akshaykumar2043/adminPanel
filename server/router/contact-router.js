import express from'express';
import bodyParser from "body-parser";
import contact from '../Controllers/contact.js';
const contactrouter = express.Router();

contactrouter.use(bodyParser.json());
contactrouter.use(express.urlencoded({ extended: false }));

contactrouter.post("/contact",contact.contactForm);


export default {contactrouter};
