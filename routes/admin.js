import express from "express";
import { Admin } from "../models/Admin.js";

const router = express.Router();
router.get("/count", async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    return res.json({ count });
  } catch (err) {
    console.error("Error in counting admins:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { router as adminRouter};
