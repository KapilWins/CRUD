import { ObjectId } from "mongoose";

export default interface user{
    name:string;
    age:number ;
    tech:string;
    email:string;
    password:string;
    status:string;
    role:string;
    organisation: ObjectId;
}

// export default interface organisation{
//     organisation:String;
// }



