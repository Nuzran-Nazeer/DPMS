import { Case } from "../model/caseModel.js";

//create a new case

export const createCase = async (request,response)=>{
    try {
        if (
            !request.body.title ||
            !request.body.description ||
            !request.body.officerHandling ||
            !request.body.drugType ||
            !request.body.age ||
            !request.body.profession ||
            !request.body.district ||
            !request.body.religion 
        ){
            return response.status(400).send({
                message: 'Fill all the required fields',
            });
        }
        const newCaseRecord = {
            title: request.body.title,
            description: request.body.description,
            officerHandling: request.body.officerHandling,
            drugType: request.body.drugType,
            age: request.body.age,
            profession: request.body.profession,
            district: request.body.district,
            religion: request.body.religion,
        };
        const createdcase = await Case.create(newCaseRecord);
        return response.status(201).send(createdcase);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }

};

//Get all cases

export const getAllCases = async (request, response)=>{
    try {
        const cases = await Case.find({});
        return response.status(200).json({
            count: cases.length,
            data: cases
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
};

//Get case by ID

export const getCasebyID = async (request, response)=>{
    try {
        const {id} = request.params;
        const getCase = await Case.findById(id);
        return response.status(200).json(getCase);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Update case

export const updateCase = async (request, response)=>{
    try {
        if (
            !request.body.title ||
            !request.body.description ||
            !request.body.officerHandling ||
            !request.body.drugType ||
            !request.body.age ||
            !request.body.profession ||
            !request.body.district ||
            !request.body.religion 
        ){
            return response.status(400).send({
                message: "Required details must be filled",
            });
        }
        request.body.updatedAt = new Date();
        const {id} = request.params;
        const updateCase = await Case.findByIdAndUpdate(id, request.body);

        if (!updateCase){
            return response.status(404).send({
                message: "Case not found" 
            })
        }
        return response.status(200).send({
            message: "Case updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};