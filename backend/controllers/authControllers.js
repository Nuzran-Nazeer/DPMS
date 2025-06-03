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

/* Login Users */

export const login = async (request, response) => {
    try {
        const { email, password } = request.body; /*Extract email and password from request body*/

        let user = null; /*Variable to hold the user found in the database*/
        let role = null; /*Variable to hold the user's role*/
        
        /* Search across all user models to find the user by email */
        for (const key in userModels) {
            user = await userModels[key].findOne({ email: email }).select('+password'); /*Find the user in the current model and explicitly select password*/
            if (user) {
                role = key; /*Set the role if the user is found*/
                break; /*Exit the loop once the user is found*/
            }
        }
        if (!user) {
            return response.status(400).json({ msg: "User does not exist." }); /*If no user is found, return an error response*/
        }

        const isPWMatch = await bcrypt.compare(password, user.password); /*Compare the provided password with the hashed password in the database*/

        if (!isPWMatch) {
            return response.status(400).json({ msg: "Invalid Password" }); /*If the password does not match, return an error response*/
        }

        /*Generate a JWT token with the user's ID and role, set to expire in 1 hour*/
        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET,{ expiresIn: '1h' }); 
        
        // Create a safe user object without sensitive data
        const safeUser = {
            id: user._id,
            role: role,
            email: user.email,
            // Add role-specific fields
            ...(user.first_name && { first_name: user.first_name }),
            ...(user.last_name && { last_name: user.last_name }),
            ...(user.policeID && { policeID: user.policeID }),
            ...(user.rank && { rank: user.rank }),
            ...(user.station && { station: user.station }),
            ...(user.courtName && { courtName: user.courtName }),
            ...(user.courtID && { courtID: user.courtID }),
            ...(user.authorityName && { authorityName: user.authorityName }),
            ...(user.registrationNumber && { registrationNumber: user.registrationNumber }),
            ...(user.address && { address: user.address }),
            ...(user.contactNumber && { contactNumber: user.contactNumber })
        };
        
        response.status(200).json({ token, user: safeUser }); /*Send back the token and safe user information*/
    } catch (error) {
        response.status(500).send({ message: error.message }); /*Return a server error response with the error message*/
    }
};
