import z from "zod";

export const login=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be atleast of 3 characters"})
    .max(255,{message:"email must not be more than 255 characters"}),

    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must not be more than 32 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
      { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long" }
    ),
    
  

    // .string({required_error:"password is required"})
    // .trim()
    // .min(8, 'The password must be at least 8 characters long')
    // .max(32, 'The password must be a maximun 32 characters')
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A- Za-z\d!@#$%&*-]{8,}$/),


})

//creating validator model

export const  signup=login.extend({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Nmae must be atleast of 3 chars."})
    .max(255,{message:"Name must not be more than 255 characters"}),
    // email:z
    // .string({required_error:"Email is required"})
    // .trim()
    // .email({message:"Invalid email address"})
    // .min(3,{message:"email must be atleast of 3 characters"})
    // .max(255,{message:"email must not be more than 255 characters"}),
    phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone must be atleast of 10 characters"})
    .max(20,{message:"phone must not be more than 20 characters"}),
    // password:z
    // .string({required_error:"password is required"})
    // .trim()
    // .min(7,{message:"password must be atleast of 6 characters"})
    // .max(1024,{message:"password must not be more than 1024 characters"}),

    // confirmPassword: z
    // .string({ required_error: "Please confirm your password" })
    // .refine((value, data) => value === data.password, {
    //   message: "Passwords do not match",
    // }),
});
// export default signup.login ;

