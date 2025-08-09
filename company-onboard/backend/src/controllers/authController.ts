import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_DAYS = Number(process.env.JWT_EXPIRES_DAYS || "90");

export const register = async (req: Request, res: Response) => {
  const { email, password, name, phone } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });
  const hashed = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (email, password_hash, name, phone) VALUES ($1,$2,$3,$4) RETURNING id, email, name, phone",
    [email, hashed, name || null, phone || null]
  );
  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_DAYS}d`,
  });
  res.json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_DAYS}d`,
  });
  res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
};
