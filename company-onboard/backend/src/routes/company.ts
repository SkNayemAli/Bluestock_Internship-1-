import { Router } from "express";
import { createCompany, getCompanyByOwner, updateCompany } from "../controllers/companyController";
import { requireAuth } from "../middleware/authMiddleware";
import multer from "multer";

const upload = multer(); // memory storage by default
const router = Router();

router.post("/", requireAuth, upload.single("logo"), createCompany);
router.get("/me", requireAuth, getCompanyByOwner);
router.put("/", requireAuth, updateCompany);

export default router;
