import express from "express";
import {
  createReport,
  getAllReports,
  getReportbyID,
  deleteReport,
  updateReport,
  shareReport,
  getAllSharedReports,
} from "../controllers/reportControllers.js";
import {
  verifyToken,
  verifyAdmin,
  verifyAdm_Po_Dpa,
  verifyCourt,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-report", createReport);

router.get("/fetchShared", verifyToken, verifyCourt, getAllSharedReports);

router.get("/:id", verifyToken, getReportbyID);
router.put("/:id", verifyToken, verifyAdmin, updateReport);

router.get("/", verifyToken, verifyAdm_Po_Dpa, getAllReports);

router.delete("/:id", verifyToken, verifyAdmin, deleteReport);

router.post("/share/:id", verifyToken, shareReport);

export default router;
