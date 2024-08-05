import jwt from "jsonwebtoken";

export const verifyToken = async (request, response, next) =>{
    try {
        let token = request.header("Authorization");

        if (!token){
            return response.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        request.user = verified;
        next();
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
}

export const verifyAdmin = async (request, response, next)=>{
    try {
        if(!request.user || !request.user.role !== "Admin"){
            return response.status(403).send("Admin Access only");
        }
        next();
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
}