import { number, required, string } from 'joi';
import user from '../interface/User/Iuser';
import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';

const schema = mongoose.Schema;


const userSchema = new schema<user>({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})
const userModel = model('User', userSchema);
export default userModel;