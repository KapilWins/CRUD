import { string } from "joi";

export default interface user{
    name:string;
    age:number ;
    tech:string;
    email:string;
    password:string;

}

export default interface request{
    user : user
    type : string
}