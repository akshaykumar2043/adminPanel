import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

const register = async (req, res,next) => {

  try {
    console.log(req.body);
    const { username, email, phone, password, is_admin } = req.body;
    const userExit = await User.findOne({ where: { email } });
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }
    if (userExit) {
      return res.status(404).json({ message: "email alerdy exists" });
    }
    //hash the password
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      // confirmPassword:hashPassword,
      phone,
      is_admin,
    });

    // Send a success response with the newly created user data
    res.status(201).json({
      msg: newUser,
      token: await newUser.generateToken(),
      userId: newUser.id.toString(),

    });
  } catch (error) {
    // console.error('Error during registration:', error);
    // return res.status(500).json({ error: `Internal Server Error ${error.message}` });
    next(error);
  }
}

const logIn = async (req, res ,next) => {
  try {
    const { email, password } = req.body;
    const userExit = await User.findOne({ where: { email } });
    if (!userExit) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }
    const user = await bcrypt.compare(password, userExit.password);
    if (user) {
      res.status(200).json({
        msg: "logIn successfull",
        token: await userExit.generateToken(),
        userId: userExit.id,
      })
    } else {
      res.status(401).json({ msg: "Invalid Credentials" })
    }
  } catch (error) {
    console.error('Error during logIN:', error);
    return res.status(500).json({ error: `Internal Server Error ${error.message}` });
  }
}
//to send user data -user logic//
const user = async(req,res)=>{
  try{
      const userData=await User.findByPk(req.body.userID);
      console.log(`Id:`,req.body.userID);
      return res.status(200).json({userData});
  }catch(error){
console.log(`error from the user route ${error}`);
  }
};



export default { register, logIn, user };