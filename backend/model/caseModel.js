import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: [0]
        },
        profession: {
            type: String,
            required: true
        },
        religion: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        officerHandling: {
            type: String,
            required: true
        },
        drugType: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Open','Closed'],
            default: 'Open'
        },
        updatedAt: {
            type: Date
        },
        closedAt: {
            type: Date
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

export const Case = mongoose.model('Case', caseSchema);