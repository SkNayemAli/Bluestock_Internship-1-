import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import companyRoutes from "./routes/company";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

app.get("/", (req, res) => res.send({ status: "ok" }));

export default app;
