import { userController } from '../controllers/mainController';
import express from 'express';
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