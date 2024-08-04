import { Court } from "../model/courtModel.js";

//Get Court Details by ID

export const getCourtbyID = async (request, response)=>{
    try {
        const {id} = request.params;
        const court = await Court.findById(id);
        return response.status(200).json(court);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Get all Courts details

export const getAllCourts = async (request, response)=>{
    try {
        const courts = await Court.find({});
        return response.status(200).json({
            count: courts.length,
            data: courts
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
};

//Delete Court by ID

export const deleteCourt = async (request, response)=>{
    try {
  
      const {id} = request.params;
      const result = await Court.findByIdAndDelete(id);
  
      if (!result){
        return response.status(404).json({message: "Court not found"});
      }
  
      return response.status(200).send({message: "Court deleted successfully"});
      
    } catch (error) {
      console.log(error.message)
      response.status(500).send({message:error.message});
      
    }
  };