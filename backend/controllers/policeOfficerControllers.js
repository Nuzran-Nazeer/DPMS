import { PoliceOfficer } from "../model/policeOfficerModel.js";

//Get Police Officer Details by ID

export const getPoliceOfficerbyID = async (request, response)=>{
    try {
        const {id} = request.params;
        const policeOfficer = await PoliceOfficer.findById(id);
        return response.status(200).json(policeOfficer);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Get all Police Officers details

export const getAllPoliceOfficers = async (request, response)=>{
    try {
        const policeOfficers = await PoliceOfficer.find({});
        return response.status(200).json({
            count: policeOfficers.length,
            data: policeOfficers
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
};

//Delete Police Officer by ID

export const deletePoliceOfficer = async (request, response)=>{
    try {
  
      const {id} = request.params;
      const result = await PoliceOfficer.findByIdAndDelete(id);
  
      if (!result){
        return response.status(404).json({message: "Police Officer not found"});
      }
  
      return response.status(200).send({message: "Police Officer deleted successfully"});
      
    } catch (error) {
      console.log(error.message)
      response.status(500).send({message:error.message});
      
    }
  };