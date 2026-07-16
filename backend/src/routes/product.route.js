import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.post("/", verifyJwt, authorize(["owner", "admin"]), addProduct);

export default router;
