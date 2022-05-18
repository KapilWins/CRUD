import { userController}  from '../controllers/user.Controller';
import {userMiddleware }from '../middlewares/middleware';
import express from 'express';
import multer from 'multer';
// import { organisationData } from '../controllers/Organisation.controller';
import { organisation } from '../models/user.Model'
export const route = express.Router();



// //create user
route.post("/user/create", userController.newUser);

// //get all data
route.get('/user', userController.allUser);

//get by id
route.get("/user/:id", userController.getById);

//delete
route.delete('/delete/:id', userController.deleteUser);

//update
route.patch('/user/update/:id', userController.updateById);

//login
route.post('/user/login', userController.login);



// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })
// const upload = multer({storage: storage}).single('image');
// route.post("/uploads", (req,res)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             const newImage= new organisation.Imagemodel({

//                 image:{
//                     data:req.file.filename,
//                     contentType:'image/png'
//                 }
                
//             })
//             console.log(newImage)
//             newImage.save().then(()=>   res.send("successful"))
//         }
//     })
// })