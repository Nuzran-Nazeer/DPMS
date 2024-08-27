import jwt from "jsonwebtoken";

export const verifyToken = async (request, response, next) => {
    try {
        let token = request.header("Authorization");

        if (!token) {
            console.log("Token missing in header");
            return response.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        request.user = verified;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyAdmin = async (request, response, next) => {
    try {

        if (!request.user || request.user.role.trim() !== "Admin") {
            console.log("Access denied: Admin role required", request.user); // Log user details
            return response.status(403).send("Admin Access only");
        }
        
        next();
    } catch (error) {
        console.log("Admin verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyPO = async (request, response, next) => {
    try {
        console.log("Request user in verifyPO:", request.user); // Log request.user

        if (!request.user || request.user.role.trim() !== "PoliceOfficer") {
            console.log("Access denied: Police Officer role required", request.user); // Log user details
            return response.status(403).send("Police Officer Access only");
        }

        next();
    } catch (error) {
        console.log("Police Officer verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyCourt = async (request, response, next) => {
    try {
        console.log("Request user in verifyCourt:", request.user); // Log request.user

        if (!request.user || request.user.role.trim() !== "Court") {
            console.log("Access denied: Court role required", request.user); // Log user details
            return response.status(403).send("Court Access only");
        }

        next();
    } catch (error) {
        console.log("Court verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyDPA = async (request, response, next) => {
    try {
        console.log("Request user in verifyDPA:", request.user); // Log request.user

        if (!request.user || request.user.role.trim() !== "DrugPreventionAuthority") {
            console.log("Access denied: DPA role required", request.user); // Log user details
            return response.status(403).send("DPA Access only");
        }

        next();
    } catch (error) {
        console.log("DPA verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyRehab = async (request, response, next) => {
    try {
        console.log("Request user in verifyRehab:", request.user); // Log request.user

        if (!request.user || request.user.role.trim() !== "RehabilitationCentre") {
            console.log("Access denied: Rehabilitation Centre role required", request.user); // Log user details
            return response.status(403).send("Rehabilitation Centre Access only");
        }

        next();
    } catch (error) {
        console.log("Rehabilitation Centre verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyAdm_Po_Dpa = async (request, response, next) => {
    try {
        const userRole = request.user?.role?.trim();
        const allowedRoles = ["Admin", "PoliceOfficer", "DrugPreventionAuthority"];

        if (!allowedRoles.includes(userRole)) {
            console.log("Access denied: Admin, Police Officer, or DPA role required", request.user);
            return response.status(403).send("Admin, Police Officer & Drug Prevention Authority Access only");
        }

        next();
    } catch (error) {
        console.log("User Role verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
};

export const verifyAdm_Po = async (request, response, next) => {
    try {
        const userRole = request.user?.role?.trim();
        const allowedRoles = ["Admin", "PoliceOfficer"];

        if (!allowedRoles.includes(userRole)) {
            console.log("Access denied: Admin or Police Officer role required", request.user);
            return response.status(403).send("Admin & Police Officer Access only");
        }

        next();
    } catch (error) {
        console.log("User Role verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
}

export const verifyRC_Court = async (request, response, next) => {
    try {
        const userRole = request.user?.role?.trim();
        const allowedRoles = ["Court", "RehabCentre"];
        if (!allowedRoles.includes(userRole)) {
            console.log("Access denied: Court or RehabCentre role required", request.user);
            return response.status(403).send("Court & RehabCentre Access only");
        }
       

        next();
    } catch (error) {
        console.log("User Role verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
}

export const verifyAllUsers = async (request, response, next) => {
    try {
        const userRole = request.user?.role?.trim();
        const allowedRoles = ["Admin", "PoliceOfficer", "DrugPreventionAuthority","Court", "RehabCentre"];

        
        if (!allowedRoles.includes(userRole)) {
            console.log("Access denied: Admin, Police Officer, DPA, Court or RehabCentre role required", request.user);
            return response.status(403).send("Admin, Police Officer, DPA, Court or RehabCentre Access only");
        }

        next();
    } catch (error) {
        console.log("User Role verification failed:", error.message);
        response.status(500).send({message: error.message});
    }
}


