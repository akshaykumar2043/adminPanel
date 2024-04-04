import contact from "../models/contact.js";
const contactForm= async(req,res)=>{
    try{
       const {username, email,message}=req.body;
    
       const newcontact = await contact.create({
        username,
        email,
        message,
      });
     return res.status(200).json({message: newcontact});

    }catch(error){
        console.error("msg:error")
 return res.status(500).json({message:"message not delivered"});
    }
}
 export default {contactForm};