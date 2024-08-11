import { Report } from "../model/reportModel.js";


// Create a new report

export const createReport = async (request,response)=>{
    try {
        if (
            !request.body.title ||
            !request.body.description ||
            !request.body.drugType ||
            !request.body.incidentDate ||
            !request.body.location 
        ){
            return response.status(400).send({
                message: 'Fill all the required fields',
            });
        }
        const newReport = {
            title: request.body.title,
            description: request.body.description,
            drugType: request.body.drugType,
            incidentDate: request.body.incidentDate,
            location: request.body.location,
            individualsInvolved: request.body.individualsInvolved,
            evidence: request.body.evidence,
        };
        const createdreport = await Report.create(newReport);
        return response.status(201).send(createdreport);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }

};

//Get all reports

export const getAllReports = async (request, response)=>{
    try {
        const reports = await Report.find({});
        return response.status(200).json({
            count: reports.length,
            data: reports
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
};

//Get a report by ID

export const getReportbyID = async (request, response)=>{
    try {
        const {id} = request.params;
        const getReport = await Report.findById(id);
        return response.status(200).json(getReport);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Update Report


export const updateReport = async (request, response)=>{
    try {
        if (
            !request.body.title ||
            !request.body.description ||
            !request.body.drugType ||
            !request.body.incidentDate ||
            !request.body.location  
        ){
            return response.status(400).send({
                message: "Required details must be filled",
            });
        }
        request.body.updatedAt = new Date();
        const {id} = request.params;
        const updatedReport = await Report.findByIdAndUpdate(id, request.body);

        if (!updatedReport){
            return response.status(404).send({
                message: "Report not found" 
            })
        }
        return response.status(200).send({
            message: "Report updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
};

//Delete report by ID

export const deleteReport = async (request, response)=>{
    try {
  
      const {id} = request.params;
      const result = await Report.findByIdAndDelete(id);
  
      if (!result){
        return response.status(404).json({message: "Report not found"});
      }
  
      return response.status(200).send({message: "Report deleted successfully"});
      
    } catch (error) {
      console.log(error.message)
      response.status(500).send({message:error.message});
      
    }
  };