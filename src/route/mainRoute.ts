import { userController } from '../controllers/mainController';
import auth from '../middlewares/middleware';
import express from 'express';
export const route = express.Router();


// //create user
route.post("/user/create",auth, userController.newUser);

// //get all data
route.get('/user',auth, userController.allUser);

//get by id
route.get("/user/:id",auth, userController.getById);

//delete
route.delete('/delete/:id',auth, userController.deleteUser);

//update
route.patch('/user/update/:id',auth, userController.updateById);

//login
route.post('/user/login',auth, userController.login);