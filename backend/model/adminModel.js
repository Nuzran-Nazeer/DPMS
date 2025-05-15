import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        first_name:{
            type: String,
            required: true,
            min: 3,
            max: 30,
            trim: true
        },
        last_name:{
            type: String,
            required: true,
            min: 3,
            max: 30,
            trim: true
        },
        policeID:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        rank:{
            type: String,
            required: true,
            enum: ['IGP','SDIGP']
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        password:{
            type: String,
            required: true,
            min: 8,
            select: false // Don't include password in queries by default
        },
        contactNumber:{
            type: String,
            required: true,
            trim: true
        },
        role:{
            type: String,
            default: 'Admin',
            enum: ['Admin']
        },
        lastLogin: {
            type: Date,
            default: null
        },
        failedLoginAttempts: {
            type: Number,
            default: 0
        },
        accountLocked: {
            type: Boolean,
            default: false
        },
        accountLockedUntil: {
            type: Date,
            default: null
        }
    },{
        timestamps: {createdAt: true, updatedAt: false},
        toJSON: {
            transform: function(doc, ret) {
                delete ret.__v;
                delete ret.password;
                delete ret.failedLoginAttempts;
                delete ret.accountLocked;
                delete ret.accountLockedUntil;
                return ret;
            }
        }
    }
);

// Add index for faster queries
adminSchema.index({ email: 1 });
adminSchema.index({ policeID: 1 });

export const Admin = mongoose.model('Admin', adminSchema);