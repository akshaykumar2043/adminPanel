import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    console.log("ABCD");
    console.log(token);
    if (!token) {
        return res
        .status(401)
        .json({ message: "Unauthrized HTTP,Token not provided" });

    }
    // const jwtToken = token.trim().replace("Bearer", "");
    const jwtToken = token.split(" ")[1];


    // const jwtToken = token.replace("Bearer", "").trim();
  
    console.log("jwtToken from auth middleware", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        // req.body.userId = isVerified.userId;
        const userData = await User.findOne({ where:{email:isVerified.email} })
        // .select({
        //      password: 0,
        //      });
        console.log(userData);
        
        // req.body.user=userData;
         req.token=token;
        req.body.userID=isVerified.userId;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Invalid token" })
    }


    // next();
};

