import joi, { any } from 'joi';
import e, { Request, Response } from 'express';
import store from '../stores/user.Store';
import bcrypt, { hash } from 'bcrypt';
import SendResponse from '../utils/Response'
import STATUS_CODES from '../utils/StatusCodes'
import IUSER from '../interface/User/Iuser';
// import { organisationData } from '../controllers/Organisation.controller';
import jwt from 'jsonwebtoken';
import { organisation } from '../models/user.Model';
const userData: any = new store();

// create new users
let newUser = async function (req: Request, res: Response) {

    try {
        //validation
        const schema = joi.object({
            name: joi.string().required(),
            age: joi.number().required(),
            tech: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().required(),
            role: joi.string().required(),
            organisation: joi.object({
                name: joi.string().required(),
                code: joi.string().required(),
            }).required(),
        });
        const params = schema.validate(req.body, { abortEarly: false });

        if (params.error) {

            return SendResponse(res, { error: params.error.message }, STATUS_CODES.BAD_REQUEST)

        }
        //email exist validation
        let emailExist = await organisation.userModel.find({ email: params.value.email })
        if (emailExist?.length != 0) {
            return SendResponse(res, { message: 'email already exists' }, STATUS_CODES.BAD_REQUEST)
        }

        //create organisation

        let orgreq = params.value.organisation;
        let org = await userData.createOrganisation(orgreq);
        
        let userInput = {
            name: params.value.name,
            age: params.value.age,
            tech: params.value.tech,
            email: params.value.email,
            password: params.value.password,
            role: params.value.role,
            organisation: org._id
        }
        //password hashing
        userInput.password = await bcrypt.hash(userInput.password, 10)
        
        //create user
        let user;
        user = await userData.createUser(userInput);

        
        if (!user && !org) {
            return SendResponse(res, { message: 'invalid credential' }, STATUS_CODES.BAD_REQUEST)
        } else {
            user.save()
            org.save();
            return SendResponse(res, { message: 'User created' }, STATUS_CODES.CREATED)
        } 
    }
    catch (e) {
        console.log(e)
        return SendResponse(res, { message: 'service failed' }, STATUS_CODES.BAD_REQUEST)
    }
}

//get by name
let login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user: IUSER
    try {
        user = await userData.getUserByEmail({ email })
        if (user) {

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (isValidPassword) {
                //generate token
                let secretKey = process.env.SECRET_KEY;
                var token = jwt.sign({ _id: '6279f2ff88048b9b42c1b240' }, secretKey);
                return SendResponse(res, { user: user, token: token, message: 'Login Successful' }, STATUS_CODES.OK)
            } else {
                //return invalid credential
                return SendResponse(res, { message: 'invalid credential' }, STATUS_CODES.BAD_REQUEST)

            }
        } else {
            //return invalid credential
            return SendResponse(res, { message: 'invalid credential' }, STATUS_CODES.BAD_REQUEST)

        }
    } catch (error) {
        return SendResponse(res, { message: 'invalid credential' }, STATUS_CODES.BAD_REQUEST)

    }
}

//get all user data
let allUser = async (req: Request, res: Response) => {
    let user: IUSER
    try {
        user = await userData.getAllUser({ allUser })


        return SendResponse(res, { user: user }, STATUS_CODES.OK)

    } catch {
        //return invalid credential
        return SendResponse(res, { message: 'invalid credential' }, STATUS_CODES.BAD_REQUEST)

    }
}

//delete user by id
let deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id
    let user: IUSER
    try {



        user = await userData.deleteById(id)
        console.log(user)

        return SendResponse(res, { message: 'User Deleted' }, STATUS_CODES.OK)


    } catch (error) {
        return SendResponse(res, { message: 'User not found' }, STATUS_CODES.NOT_FOUND)
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

export const userController = {
    allUser,
    newUser,
    deleteUser,
    getById,
    updateById,
    login
}