import { Router } from "express";
import {
  registerEmployee,
  loginEmployee,
  logoutEmployee
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.post("/logout", logoutEmployee)
export default router;
