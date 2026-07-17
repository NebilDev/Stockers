import { Router } from "express";
import { addProduct, getProducts } from "../controllers/product.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.post("/", verifyJwt, authorize(["owner", "admin"]), addProduct);
router.get(
  "/",
  verifyJwt,
  authorize(["owner", "admin", "seller"]),
  getProducts,
);

export default router;
