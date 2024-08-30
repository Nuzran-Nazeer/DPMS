import { Case } from "../model/caseModel.js";
import { PoliceOfficer } from "../model/policeOfficerModel.js";

//create a new case

export const createCase = async (request, response) => {
  try {
    const {
      caseNo,
      title,
      description,
      officerHandling,
      drugType,
      age,
      profession,
      district,
      religion,
    } = request.body;

    // Validate required fields
    if (
      !caseNo ||
      !title ||
      !description ||
      !drugType ||
      !age ||
      !profession ||
      !district ||
      !religion
    ) {
      return response.status(400).send({
        message: "Fill all the required fields",
      });
    }

    // Check if the case already exists
    const existingCase = await Case.findOne({ caseNo });
    if (existingCase) {
      return response
        .status(409)
        .json({ message: "Case number already exists" });
    }

    // Extract user details from the request object
    const userId = request.user.id;
    const userRole = request.user.role;

    let assignedOfficer;

    if (userRole === "PoliceOfficer") {
      assignedOfficer = userId; // Assign the case to the police officer who created it
    } else if (userRole === "Admin") {
      // Validate officerHandling provided by the admin
      if (!officerHandling) {
        return response
          .status(400)
          .json({ message: "Officer must be selected by Admin" });
      }

      const officer = await PoliceOfficer.findById(officerHandling);
      if (!officer) {
        return response
          .status(400)
          .json({ message: "Invalid officer selected" });
      }

      assignedOfficer = officer._id; // Assign the selected officer
    } else {
      return response
        .status(403)
        .json({ message: "Unauthorized to create a case" });
    }

    // Create new case record
    const newCaseRecord = {
      caseNo,
      title,
      description,
      officerHandling: assignedOfficer,
      drugType,
      age,
      profession,
      district,
      religion,
    };

    const createdcase = await Case.create(newCaseRecord);
    return response.status(201).send(createdcase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//Get all cases

export const getAllCases = async (req, res) => {
  try {
    const user = req.user; // Decoded token information
    let cases;

    if (user.role === "Admin" || user.role === "DrugPreventionAuthority") {
      cases = await Case.find(); // Admin and DPA see all cases
    } else if (user.role === "PoliceOfficer") {
      cases = await Case.find({ officerHandling: user._id }); // Police Officer sees only their own cases
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json({ data: cases });
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get case by ID

export const getCasebyID = async (request, response) => {
  try {
    const { id } = request.params;
    const getCase = await Case.findById(id);
    return response.status(200).json(getCase);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Update Case
export const updateCase = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      title,
      description,
      officerHandling,
      drugType,
      age,
      profession,
      district,
      religion,
    } = request.body;

    // Ensure all required fields are provided
    if (
      !title ||
      !description ||
      !drugType ||
      !age ||
      !profession ||
      !district ||
      !religion
    ) {
      return response
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if case exists
    const caseToUpdate = await Case.findById(id);
    if (!caseToUpdate) {
      return response.status(404).json({ message: "Case not found" });
    }

    // Extract user role from the request object (assuming it's added by authentication middleware)
    const userRole = request.user.role;

    // Ensure only Admins can update the officerHandling field
    if (officerHandling && userRole !== "Admin") {
      return response
        .status(403)
        .json({ message: "Only Admins can update the officerHandling field" });
    }

    // Validate officerHandling if provided
    if (officerHandling) {
      const officer = await PoliceOfficer.findById(officerHandling);
      if (!officer) {
        return response
          .status(400)
          .json({ message: "Invalid officer selected" });
      }
    }

    // Update case
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        title,
        description,
        officerHandling,
        drugType,
        age,
        profession,
        district,
        religion,
        updatedAt: new Date(),
      },
      { new: true } // Return the updated case
    );

    if (!updatedCase) {
      return response.status(404).json({ message: "Case not found" });
    }

    return response
      .status(200)
      .json({ message: "Case updated successfully", case: updatedCase });
  } catch (error) {
    console.error(error.message);
    response
      .status(500)
      .json({
        message: "An error occurred while updating the case",
        error: error.message,
      });
  }
};

//Delete Case

export const deleteCase = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Case.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Case not found" });
    }

    return response.status(200).send({ message: "Case deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

//Share a Case

export const shareCase = async (request, response) => {
  const { id } = request.params;
  const { sharedWith } = request.body;

  try {
    const sharedCase = await Case.findById(id);

    if (!sharedCase) {
      return response.status(404).json({ message: "Case not found" });
    }

    if (sharedWith === "Court") {
      sharedCase.sharedWithCourt = true;
    } else if (sharedWith === "RehabCentre") {
      sharedCase.sharedWithRehab = true;
    } else {
      return response.status(400).json({ message: "Invalid role for sharing" });
    }

    await sharedCase.save();

    return response.status(200).json({ message: "Case shared successfully" });
  } catch (error) {
    console.error("Error sharing case:", error);
    return response.status(500).json({ message: "Error sharing case" });
  }
};

export const getAllSharedCases = async (req, res) => {
  try {
    const { role } = req.params; // Decoded token information
    let cases;

    if (role === "Court") {
      cases = await Case.find({ sharedWithCourt: true });
    } else if (role === "RehabCentre") {
      cases = await Case.find({ sharedWithRehab: true });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ data: cases });
  } catch (error) {
    console.error("Error fetching shared cases:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCasesByOfficerHandling = async (req, res) => {
  try {
    const { officerId } = req.params;

    // Check if officerId is provided
    if (!officerId) {
      return res.status(400).json({ message: "Officer ID is required" });
    }

    // Validate officerId
    const officer = await PoliceOfficer.findById(officerId);
    if (!officer) {
      return res.status(404).json({ message: "Officer not found" });
    }

    // Retrieve cases assigned to the officer
    const cases = await Case.find({ officerHandling: officerId });

    if (cases.length === 0) {
      return res
        .status(404)
        .json({ message: "No cases found for this officer" });
    }

    res.status(200).json({ data: cases });
  } catch (error) {
    console.error("Error retrieving cases by officer handling:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


