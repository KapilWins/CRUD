import jwt from 'jsonwebtoken';
import SendResponse from '../utils/Response';
import STATUS_CODES from '../utils/StatusCodes';
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';

//Token authentication
const auth = async (req, res, next) => {
    try {
        console.log('auth is running')
        const tokenString = req.headers.authorization

        let token = tokenString.replace('Bearer ', "")
        let secretKey = process.env.SECRET_KEY

        const verifyUser: any = jwt.verify(token, secretKey)
        console.log(verifyUser)
        if (!verifyUser) {
            req.userId= verifyUser._id;
            return SendResponse(res, { message: "User Unauthorized", }, STATUS_CODES.UN_AUTHORIZED)

            //  SendResponse(res, { message: "User Authorized", verifyUser: verifyUser }, STATUS_CODES.OK)

        } else {

            next()
        }
    } catch (error) {
        return SendResponse(res, { message: "User Unauthorized ", }, STATUS_CODES.UN_AUTHORIZED)

    }
}

//upload image
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })
// const upload = multer({storage: storage}).single('testImage');



//export
export const userMiddleware = {
    auth,

}
