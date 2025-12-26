export const handleError = (error,req,res,next)=>{
    console.log(error,"this is error")
    return res.status(500).json({
        message:error ,
        error:true,
        success:false
    })
}
