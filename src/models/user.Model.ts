import { any, number, required, string } from 'joi';
import user from '../interface/User/Iuser';
import mongoose, { model, Schema } from 'mongoose';
import { role, status } from '../utils/enum';
import { buffer } from 'stream/consumers';
const schema = mongoose.Schema;

const organisationSchema = new schema({

    name: {
        type: String
    },
    code: {
        type: String
    }
})


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
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: status,
        default: status.ACTIVE,
    },
    role: {
        type: String,
        required: true,
        enum: role,
        default: role.USER,
    },

    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' },
});




const userModel = mongoose.model('User', userSchema);
const organisationModel = mongoose.model('Organisation', organisationSchema);
export const organisation = { userModel, organisationModel}
