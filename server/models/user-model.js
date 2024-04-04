import { DataTypes } from 'sequelize';
import jwt from "jsonwebtoken" ;
import {sequelize} from"../utils/db.js"; 

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // confirmPassword:{
  //   type:DataTypes.STRING,
  //   allowNull:false,
  //     },
      
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // or true, depending on your requirements
      }
}, );
// User.prototype.generateToken = async function(){
//   try{
//     const token= jwt.sign(
//       {
//         userId:this.id.toString(),
//         email:this.email,
//         isAdmin:this.isAdmin,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn:"30d",
//       }
//          );
//          return token;
         
//   }catch(error){
//     console.error("Error generating token:",error);
//     throw error;
//   }
// } 

User.prototype.generateToken = async function(){
  try {
    const user = await User.findOne({
      where: { email: this.email }
    });

    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign(
      {
        userId: user.id.toString(), // Assuming _id is the unique identifier
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    return token;
  } catch(error) {
    console.error("Error generating token:", error);
    throw error;
  }
}







export default User;