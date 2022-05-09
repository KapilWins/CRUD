import joi from 'joi';
import e, { Request, Response } from 'express';
import userModel from '../models/mainModel';

import bcrypt, { hash } from 'bcrypt';
import SendResponse from '../utils/Response'
import STATUS_CODES from '../utils/StatusCodes'

const userData = userModel;

// create new users

let newUser = async function (req: Request, res: Response) {

    //validation
    const schema = joi.object({
        name: joi.string().required(),
        age: joi.number().required(),
        tech: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
    })
    const params = schema.validate(req.body, { abortEarly: false });
    if (params.error) {
        return SendResponse(res, { Error: params.error.message}, STATUS_CODES.BAD_REQUEST)
        
    }

    // new user
    let userInput = req.body;


    //password hash 
    userInput.password = await bcrypt.hash(userInput.password, 12);

    const user = new userData({
        name: userInput.name,
        age: userInput.age,
        tech: userInput.tech,
        email: userInput.email,
        password: userInput.password,

    });


    user.save()
    return SendResponse(res, { message: 'User Created', id:user._id }, STATUS_CODES.CREATED)
}

//get all user data
let allUser = async (req: Request, res: Response) => {
    const users = await userData.find()
    return SendResponse(res, { Data: users }, STATUS_CODES.OK)


}

//delete user by id
let deleteUser = async (req: Request, res: Response) => {
    try {
        const deleteData = await userData.findByIdAndDelete(req.params.id)
        if (deleteData === null) {
            return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)
        }

        else {
            return SendResponse(res, { deleteData, Message: "Deleted" }, STATUS_CODES.OK)
        }

    } catch (error) {
        return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)
    }
}

// //get by id
let getById = async (req: Request, res: Response) => {
    try {
        const userById = await userData.findById(req.params.id)
        if (userById === null) {
            return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)
        } else {
            return SendResponse(res, { Name: userById.name, Age: userById.age, Tech: userById.tech }, STATUS_CODES.OK)
        }
    } catch (error) {
        return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)
    }

}

//update by id
let updateById = async (req: Request, res: Response) => {
    try {
        const byId = await userData.findByIdAndUpdate(req.params.id, req.body);
        if (byId === null) {
            return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)

        } 
        else {
            return SendResponse(res, { Name: byId.name, Age: byId.age, Tech: byId.tech, Email: byId.email, Message: "Update Successful" }, STATUS_CODES.OK)
        }
    } catch (error) {
        return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)
    }
}

//login
let login = async (req: Request, res: Response) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const userExist: any = await userData.findOne({ email: email });
        if (userExist) {
            const passCheck = await bcrypt.compare(password, userExist.password)
            if (passCheck === true) {
                return SendResponse(res, { user: userExist, message: 'Login Successful' }, STATUS_CODES.OK)

            } else {
                return SendResponse(res, { message: "Invalid Credentials" }, STATUS_CODES.UN_AUTHORIZED)
            }
        } else {
            return SendResponse(res, { Message: "Invalid Credentials" }, STATUS_CODES.UN_AUTHORIZED)
        }

    } catch (error) {
        return SendResponse(res, { Message: 'User not found' }, STATUS_CODES.NOT_FOUND)
    }


}

export const userController = {
    allUser,
    newUser,
    deleteUser,
    getById,
    updateById,
    login
}