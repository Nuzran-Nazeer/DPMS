import { DrugPreventionAuthority } from "../model/drugPreventionAuthorityModel.js";

//Get Drug Prevention Authority Details by ID

export const getDrugPreventionAuthoritybyID = async (request, response)=>{
    try {
        const {id} = request.params;
        const drugPreventionAuthority = await DrugPreventionAuthority.findById(id);
        return response.status(200).json(drugPreventionAuthority);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Get all Police Officers details

export const getAllDrugPreventionAuthorities = async (request, response)=>{
    try {
        const drugPreventionAuthorities = await DrugPreventionAuthority.find({});
        return response.status(200).json({
            count: drugPreventionAuthorities.length,
            data: drugPreventionAuthorities
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
};

//Delete Police Officer by ID

export const deleteDrugPreventionAuthority = async (request, response)=>{
    try {
  
      const {id} = request.params;
      const result = await DrugPreventionAuthority.findByIdAndDelete(id);
  
      if (!result){
        return response.status(404).json({message: "Drug Prevention Authority not found"});
      }
  
      return response.status(200).send({message: "Drug Prevention Authority deleted successfully"});
      
    } catch (error) {
      console.log(error.message)
      response.status(500).send({message:error.message});
      
    }
  };