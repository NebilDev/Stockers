import { Router } from "express";
import {
  registerEmployee,
  loginEmployee,
  logoutEmployee,
  getEmployee,
} from "../controllers/auth.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
const router = Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.post("/logout", logoutEmployee);
router.get("/me", verifyJwt, getEmployee);

export default router;
