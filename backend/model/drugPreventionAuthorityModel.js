import mongoose from "mongoose";

const drugPreventionAuthoritySchema = new mongoose.Schema(
    {
        authorityName:{
            type: String,
            required: true,
        },
        registrationNumber:{
            type: String,
            required: true,
            unique: true
        },
        address:{
            type: String,
            required: true,
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
        operationalStatus:{
            type: String,
            enum: ['Active','Inactive'],
            default: 'Active'
        },
        role:{
            type: String,
            default: 'Drug Prevention Authority'
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

export const DrugPreventionAuthority = mongoose.model('DrugPreventionAuthority', drugPreventionAuthoritySchema);