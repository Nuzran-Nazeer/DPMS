import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        first_name:{
            type: String,
            required: true,
            min: 3,
            max: 30
        },
        last_name:{
            type: String,
            required: true,
            min: 3,
            max: 30
        },
        policeID:{
            type: String,
            required: true,
            unique: true
        },
        rank:{
            type: String,
            required: true,
            enum: ['IGP','SDIGP']
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            min: 8
        },
        contactNumber:{
            type: String,
            required: true
        },
        role:{
            type: String,
            default: 'Admin'
        }
    },{
        timestamps: {createdAt: true, updatedAt: false},
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v;
                delete ret.password; 
                return ret;
            }
        }
    }
)

export const Admin = mongoose.model('Admin', adminSchema);