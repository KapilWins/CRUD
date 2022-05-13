import IUSER from '../interface/User/Iuser';
import userModel from '../models/userModel';
import { Request } from 'express';
import { any } from 'joi';
import { status } from '../utils/enum';

export default class userStore {

    //login get by email
    async getUserByEmail({ email }) {
        let user: IUSER

        try {
            user = await userModel.findOne({ email })
        } catch (error) {
            console.log(error)
        }
        return user;
    }

    //all user data
    async getAllUser({ allUser }) {
        let user: IUSER

        try {
            user = await userModel.find({ allUser }).lean()

        } catch (error) {
            console.log(error)
        }
        return user;
    }

    //create new user
    async createUser(userInput: any) {
        let user
        try {
            user = new userModel(userInput);
            user.save();
        } catch (error) {
            return error;
        }
        return user
    }
    
    
    //delete user
    async deleteById(userId) {
        let user: IUSER
        try {
            user = await userModel.findById(userId).lean()

            if (user !== null) {
                let deletedUser = await userModel.updateOne({ _id: userId }, { $set: { status: status.INACTIVE } })
                console.log(deletedUser)
                return deletedUser
                
            } else {
                console.log("error")
                
            }
        } catch (error) {
            console.log(error)
        }
        return user;
    }
    
}





// async findUserById(id){
//  try{
//     let user = await userModel.findById(id).lean().exec()
//     if(!user){

//     }

//  }   
//  catch(e){

//  }
// }