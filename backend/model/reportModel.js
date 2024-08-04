import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        drugType: {
            type: String,
            required: true
        },
        incidentDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        evidence: {
            type: String,
            required: false
        },
        individualsInvolved: {
            type: String,
            required: false
        },
    }, {
        timestamps: {createdAt: true, updatedAt: false},
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v; 
                return ret;
            }
        }
    }
)

export const Report = mongoose.model('Report', reportSchema);