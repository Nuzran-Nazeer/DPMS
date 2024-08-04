import { RehabCentre } from "../model/rehabCentreModel.js";

//Get Rehab Centre Details by ID

export const getRehabCentrebyID = async (request, response)=>{
    try {
        const {id} = request.params;
        const rehabCentre = await RehabCentre.findById(id);
        return response.status(200).json(rehabCentre);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Get all Rehab Centres details

export const getAllRehabCentres = async (request, response)=>{
    try {
        const rehabCentres = await RehabCentre.find({});
        return response.status(200).json({
            count: rehabCentres.length,
            data: rehabCentres
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
};

//Delete Rehab Centre by ID

export const deleteRehabCentre = async (request, response)=>{
    try {
  
      const {id} = request.params;
      const result = await RehabCentre.findByIdAndDelete(id);
  
      if (!result){
        return response.status(404).json({message: "Rehab Centre not found"});
      }
  
      return response.status(200).send({message: "Rehab Centre deleted successfully"});
      
    } catch (error) {
      console.log(error.message)
      response.status(500).send({message:error.message});
      
    }
  };