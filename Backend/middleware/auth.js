import  jwt  from "jsonwebtoken"

export const auth = (req, res, next) => {
    try {
        const headers = req.headers
        const token = headers.authorization

         if(!token){
        return res.status(404).json({
            message:"please login",
            error:true,
            success:false,

        })
        }
        const data = jwt.decode(token , "fghjkl")
        
        req.body = {...req.body , userId : data.userId}
        next()
       
    } catch (error) {
        next(error)
    }
}