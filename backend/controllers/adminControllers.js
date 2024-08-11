import { PoliceOfficer } from "../model/policeOfficerModel.js";
import { DrugPreventionAuthority } from "../model/drugPreventionAuthorityModel.js";
import { Court } from "../model/courtModel.js";
import { RehabCentre } from "../model/rehabCentreModel.js";
import { Admin } from "../model/adminModel.js";

//Get All Users based on their roles


export const getUsers = async (request, response) => {
    try {
        const policeOfficers = await PoliceOfficer.find();
        const drugPreventionAuthorities = await DrugPreventionAuthority.find();
        const courts = await Court.find();
        const rehabCentres = await RehabCentre.find();
        const admins = await Admin.find();

        const users = [
            ...policeOfficers.map(user => ({ ...user.toObject(), role: 'Police Officer' })),
            ...drugPreventionAuthorities.map(user => ({ ...user.toObject(), role: 'Drug Prevention Authority' })),
            ...courts.map(user => ({ ...user.toObject(), role: 'Court' })),
            ...rehabCentres.map(user => ({ ...user.toObject(), role: 'Rehab Centre' })),
            ...admins.map(user => ({ ...user.toObject(), role: 'Admin' })),
        ];

        response.json({data: users});
    } catch (error) {
        response.status(500).json({ message: 'Server Error' });
    }
};

//Get user by ID

export const getUserById = async (request, response) => {
    try {
        const { id } = request.params;

        // Helper function to remove the password field from user data
        const excludePassword = (user) => {
            const userObj = user.toObject();
            delete userObj.password; 
            return userObj;
        };

        let user = await PoliceOfficer.findById(id);
        if (user) return response.json({ data: { ...excludePassword(user), role: 'Police Officer' } });

        user = await DrugPreventionAuthority.findById(id);
        if (user) return response.json({ data: { ...excludePassword(user), role: 'Drug Prevention Authority' } });

        user = await Court.findById(id);
        if (user) return response.json({ data: { ...excludePassword(user), role: 'Court' } });

        user = await RehabCentre.findById(id);
        if (user) return response.json({ data: { ...excludePassword(user), role: 'Rehab Centre' } });

        user = await Admin.findById(id);
        if (user) return response.json({ data: { ...excludePassword(user), role: 'Admin' } });

        response.status(404).json({ message: 'User not found' });

    } catch (error) {
        response.status(500).json({ message: 'Server Error' });
    }
};

//Edit Users based on the id

export const updateUser = async (request, response) => {
    try {
        const { id } = request.params;
        const updatedData = request.body;
        
        // Remove fields that shouldn't be updated
        delete updatedData.password;
        delete updatedData._id;

        // Helper function to find and update user based on model and role
        const updateUserInModel = async (Model, role) => {
            const user = await Model.findByIdAndUpdate(id, updatedData, { new: true });
            if (user) {
                return response.status(200).json({
                    message: `${role} updated successfully`,
                    data: { ...user.toObject(), role }
                });
            }
            return null;
        };

        let userUpdated = await updateUserInModel(PoliceOfficer, 'Police Officer');
        if (userUpdated) return;

        userUpdated = await updateUserInModel(DrugPreventionAuthority, 'Drug Prevention Authority');
        if (userUpdated) return;

        userUpdated = await updateUserInModel(Court, 'Court');
        if (userUpdated) return;

        userUpdated = await updateUserInModel(RehabCentre, 'Rehab Centre');
        if (userUpdated) return;

        userUpdated = await updateUserInModel(Admin, 'Admin');
        if (userUpdated) return;

        response.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Server Error' });
    }
};


// Delete user based on the id
export const deleteUser = async (request, response) => {
    try {
        const { id } = request.params;

        // Helper function to delete user based on model and role
        const deleteUserFromModel = async (Model, role) => {
            const user = await Model.findByIdAndDelete(id);
            if (user) {
                return response.status(200).json({
                    message: `${role} deleted successfully`
                });
            }
            return null;
        };

        let userDeleted = await deleteUserFromModel(PoliceOfficer, 'Police Officer');
        if (userDeleted) return;

        userDeleted = await deleteUserFromModel(DrugPreventionAuthority, 'Drug Prevention Authority');
        if (userDeleted) return;

        userDeleted = await deleteUserFromModel(Court, 'Court');
        if (userDeleted) return;

        userDeleted = await deleteUserFromModel(RehabCentre, 'Rehab Centre');
        if (userDeleted) return;

        userDeleted = await deleteUserFromModel(Admin, 'Admin');
        if (userDeleted) return;

        response.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Server Error' });
    }
};
