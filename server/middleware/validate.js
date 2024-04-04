
export const validate=(Schema)=>async(req,res,next)=>{
    try{
       const parseBody=await Schema.parseAsync(req.body);
       req.body=parseBody;
       next();
        } catch(err){
            const status=422;
            const message="fill the input properly";
            const extraDetails=err.errors[0].message;
            console.log(message);
  const error={
    status,
    message,
    extraDetails,
  };
  console.log(error);
    //    res.status(404).json({msg:message});
    next(error);
    }
};
// export default validate;