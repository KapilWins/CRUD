// import { organisation } from '../models/user.Model';
// import store from '../stores/user.Store';
// import e, { Request, Response } from 'express';
// import SendResponse from '../utils/Response'
// import STATUS_CODES from '../utils/StatusCodes'
// import joi, { any } from 'joi';
// const userData = new store();


// let createOrg = async function (req: Request, res: Response) {

//     try {
//         //validation
//         const schema = joi.object({
//             name: joi.string().required(),
//             code: joi.string().required(),
//         });
//         const params = schema.validate(req.body, { abortEarly: false });

//         let userInput = {
//             name: params.value.name,
//             Code: params.value.code,
//         }

//         let organisation = await userData.createOrganisation(userInput);
        
// return organisation;
//     } catch (e) {
//         return SendResponse(res, { message: 'service failed' }, STATUS_CODES.BAD_REQUEST)
//     }
// }

// export const organisationData = {
//     createOrg
// }

