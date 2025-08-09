import { Request, Response } from "express";
import db from "../db";
import cloudinary from "../utils/cloudinary";
import { AuthRequest } from "../middleware/authMiddleware";

export const createCompany = async (req: AuthRequest, res: Response) => {
  const { name, type, address, phone, website } = req.body;
  const ownerId = req.user?.id;
  if (!ownerId) return res.status(401).json({ message: "Unauthorized" });

  // If file present (multer places file at req.file)
  let logoUrl = null;
  if ((req as any).file) {
    const resUpload = await cloudinary.uploader.upload_stream(
      { folder: "companies" },
      (error: any, result: any) => {
        if (error) {
          console.error(error);
        }
        return result;
      }
    );
    // We will use direct upload via buffer in multer route below for production; placeholder here
  }

  const result = await db.query(
    `INSERT INTO company_profile (owner_id, name, type, address, phone, website, logo_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [ownerId, name, type, address, phone, website, logoUrl]
  );
  res.json({ company: result.rows[0] });
};

export const getCompanyByOwner = async (req: AuthRequest, res: Response) => {
  const ownerId = req.user?.id;
  const { rows } = await db.query("SELECT * FROM company_profile WHERE owner_id = $1", [ownerId]);
  res.json({ company: rows[0] || null });
};

export const updateCompany = async (req: AuthRequest, res: Response) => {
  const ownerId = req.user?.id;
  const { name, type, address, phone, website } = req.body;
  const { rows } = await db.query(
    `UPDATE company_profile SET name=$1,type=$2,address=$3,phone=$4,website=$5 WHERE owner_id = $6 RETURNING *`,
    [name, type, address, phone, website, ownerId]
  );
  res.json({ company: rows[0] });
};
