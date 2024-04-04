import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import router from "./router/auth-router.js";
import contactrouter from "./router/contact-router.js";
import adminrouter from "./router/admin-router.js";
import { errorMiddleware } from './middleware/error-middleware.js';
const app = express();

const user_router = router;
const contact_router = contactrouter;
const admin_router=adminrouter;
//let's tackle cors


const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", contact_router.contactrouter);
app.use("/api", user_router.router);
app.use("/api", admin_router.adminrouter);
app.use(errorMiddleware);
const PORT = 5000;
app.listen(PORT, () => console.log(`server started at port:${PORT}`));
