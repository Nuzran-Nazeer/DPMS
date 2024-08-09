import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PoliceOfficer } from "../model/policeOfficerModel.js";
import { DrugPreventionAuthority } from "../model/drugPreventionAuthorityModel.js";
import { Court } from "../model/courtModel.js";
import { RehabCentre } from "../model/rehabCentreModel.js";
import { Admin } from "../model/adminModel.js";

const userModels = {
    PoliceOfficer,
    DrugPreventionAuthority,
    Court,
    RehabCentre,
    Admin
}

// Register Dynamic Users

export const registerUser = async (request, response)=>{
    try {

        const { role, ...userData } = request.body;

        console.log('Parsed role:', role);
        console.log('Parsed userData:', userData); // Debug log

        if (!role || !userModels[role]){
            return response.status(400).send({
                message: "Invalid User Role",
            });
        }

        const UserModel = userModels[role];
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(userData.password, salt);
        userData.password = passwordHash;

        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) {
            return response.status(400).send({
                message: 'Email already exists',
            });
        }
        
        const registerUser = await UserModel.create(userData);
        return response.status(201).json({ message: 'Registration successful!', user: registerUser });
    } catch (error) {
        console.log("Error :", error.message);
        if (error.code === 11000) {
           
            const duplicateField = Object.keys(error.keyPattern)[0];

            // Capitalize the first letter of the duplicate field
            const capitalizedField = duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1);

            return response.status(400).json({ message: `${capitalizedField} already exists. Please use a different one.` });
        }
        response.status(500).send({message:error.message}); 
    }
};

// Login Users

export const login = async (request, response) => {
    try {
        const { role, email, password } = request.body;

        if (!role || !userModels[role]  ){
            return response.status(400).json({msg: "Invalid User Role. "});
        }

        const UserModel = userModels[role];
        const user = await UserModel.findOne({ email: email});

        if (!user){
            return response.status(400).json({msg: "User does not exist. "});
        }

        const isPWMatch = await bcrypt.compare(password, user.password);

        if (!isPWMatch){
            return response.status(400).json({msg: "Invalid Password"});
        }
        const token = jwt.sign({id: user._id, role: role }, process.env.JWT_SECRET);
        response.status(200).json({token, user});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
}