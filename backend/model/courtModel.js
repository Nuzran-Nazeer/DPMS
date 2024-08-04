import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
    {
        courtName:{
            type: String,
            required: true
        },
        courtID:{
            type: String,
            required: true,
            unique: true
        },
        courtName:{
            type: String,
            required: true
        },
        contactNumber:{
            type: String,
            required: true
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
        role:{
            type: String,
            default: 'Court'
        }
    },{
        timestamps: {createdAt: true, updatedAt: false},
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v; 
                return ret;
            }
        }
    }
)

export const Court = mongoose.model('Court', courtSchema);