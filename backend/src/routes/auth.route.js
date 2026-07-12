import { Router } from "express";
import {
  registerEmployee,
  loginEmployee,
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

export default router;
