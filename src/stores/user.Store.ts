import IUSER from '../interface/User/Iuser';
import {organisation} from '../models/user.Model';
import { Request } from 'express';
import { any } from 'joi';
import { status } from '../utils/enum';
import mongoose from 'mongoose';

export default class userStore {

    //login get by email
    async getUserByEmail({ email }) {
        let user: IUSER

        try {
            user = await organisation.userModel.findOne({ email });
        } catch (error) {
            console.log(error)
        }
        return user;
    }

    //all user data
    async getAllUser({ allUser }) {
        let user:any

        try {
            user = await organisation.userModel.find().populate("organisation");
            

        } catch (error) {
            console.log(error)
        }
        return user;
    }

    //create new user and organisation
    async createOrganisation(userInput) {
        let org
        try {
            org = await new organisation.organisationModel(userInput);
            return org
        } catch (error) {
            return error;
        }
    
    }
    async createUser(userInput: any) {
        let user: IUSER
        try {
            user = new organisation.userModel(userInput);
      
        } catch (error) {
            return error;
        }
        return user
    }
    
    
    //delete user
    async deleteById(userId) {
        let user: IUSER
        try {
            user = await organisation.userModel.findById(userId).populate("organisation");

            if (user !== null) {
                let deletedUser = await organisation.userModel.updateOne({ _id: userId }, { $set: { status: status.INACTIVE } })
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