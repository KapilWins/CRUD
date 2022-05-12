import jwt from 'jsonwebtoken';
import SendResponse from '../utils/Response';
import STATUS_CODES from '../utils/StatusCodes';
import multer from 'multer';
import { NextFunction,Request,Response } from 'express';


const auth = async(req:Request,res:Response,next: NextFunction)=>{
    try {
        const tokenString= req.headers.authorization

        let token = tokenString.replace('Bearer ',"")
        let secretKey= process.env.SECRET_KEY

        const verifyUser:any= jwt.verify(token,secretKey)
        if(verifyUser){
            // req.userId= verifyUser._id;
 
            return SendResponse(res,{message:"User Authorized", verifyUser:verifyUser}, STATUS_CODES.OK)
        
        }else{
            return SendResponse(res,{message:"User Unauthorized",}, STATUS_CODES.UN_AUTHORIZED)
        }
    } catch (error) {
        return SendResponse(res,{message:"User Unauthorized ",}, STATUS_CODES.UN_AUTHORIZED)

    }
}
export default auth;
