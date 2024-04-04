import User from "../models/user-model.js";
import contact from "../models/contact.js";
import { where } from "sequelize";
const getAllUsers = async (req, res, next) => {
  try {
    const users = (await User.findAll({ attributes: { exclude: ['password'] } })); // order: [['username', 'ASC']]
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });

    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }

};

// const deleteUserById = async (req, res,next) => {
//     try {
//       const id=req.params.id;
//     //   await User.deleteOne({id:id});
//     await User.destroy({ where: { id: id } });
//     //   return res.status(200).json({message:"User Delted Successfully"})
//     } catch (error) {
//         next(error);
//     }
// };





const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ where: { id: id } }, { attributes: { exclude: ['password'] } });
    console.log(User);
    if (data) {
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ message: "data not found" });
    }
  } catch (error) {
    next(error);
  }
};



const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.destroy({ where: { id: id } });
    console.log(deletedUser);
    if (deletedUser === 1) {
      return res.status(200).json({ message: "User Deleted Successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {username,phone,email} = req.body;
    const user=await User.findOne({where:{id:id}});

    const updateData = await user.update(
      {username: username, email:email ,phone:phone}
    );
    return res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
}






const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contact.findAll({ attributes: { exclude: ['password'] } });
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Users Found" });

    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }

};
const getContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await contact.findOne({ where: { id: id } }, { attributes: { exclude: ['password'] } });
    console.log(contact);
    if (data) {
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ message: "data not found" });
    }
  } catch (error) {
    next(error);
  }
};




const  deleteContactById=async(req,res,next)=>{
  try {
    const id = req.params.id;
    const deletedContact = await contact.destroy({ where: { id: id } });
    console.log(deletedContact);
    if (deletedContact === 1) {
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    } else {
      return res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
}




export default { getAllUsers, getAllContacts, deleteUserById, getUserById,updateUserById,getContactById ,deleteContactById}; 