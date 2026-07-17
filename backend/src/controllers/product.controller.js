import {
  findProductByModel,
  createProduct,
  findProducts,
} from "../models/product.model.js";
import { MAX_PAGE_SIZE } from "../config/constants.js";
const addProduct = async (req, res) => {
  try {
    //accept data
    const {
      category,
      brand,
      model,
      buying_price,
      selling_price,
      minimum_quantity,
    } = req.body;
    const cleanCategory = category.trim().toLowerCase();
    const cleanBrand = brand.trim().toLowerCase();
    const cleanModel = model.trim().toLowerCase();
    // validate data
    if (
      !cleanCategory ||
      !cleanBrand ||
      !cleanModel ||
      !buying_price ||
      !selling_price ||
      !minimum_quantity
    )
      return res.status(400).json({ message: "All fields are required!" });
    if (Number.isNaN(!Number(buying_price)))
      return res.status(400).json({ message: "Buying price must be a number" });
    if (Number.isNaN(!Number(selling_price)))
      return res
        .status(400)
        .json({ message: "Selling price must be a number" });
    if (Number.isNaN(!Number(minimum_quantity)))
      return res
        .status(400)
        .json({ message: "Minimum quantity must be a number" });
    if (buying_price < 0)
      return res
        .status(400)
        .json({ message: "Buying price cannot be negative" });
    if (selling_price < 0)
      return res
        .status(400)
        .json({ message: "Selling price cannot be negative" });
    if (minimum_quantity < 0)
      return res
        .status(400)
        .json({ message: "Minimum quanity cannot be negative" });

    // check if already exists
    const existingProduct = await findProductByModel(cleanModel);
    if (existingProduct)
      return res.status(409).json({ message: "Product already exists" });

    //create product
    // createProduct using model
    const result = await createProduct({
      category: cleanCategory,
      brand: cleanBrand,
      model: cleanModel,
      buying_price,
      selling_price,
      quantity: 0,
      minimum_quantity,
    });
    return res.status(201).json({
      message: "Product created successfully!",
      productId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    //change to number
    const pageNum = Number(page);
    const limitNum = Number(limit);

    //validate
    if (Number.isNaN(pageNum) || Number.isNaN(limitNum))
      return res.status(400).json({ message: "Parameters should be numbers" });
    if (!Number.isInteger(pageNum) || !Number.isInteger(limitNum))
      return res.status(400).json({ message: "Parameters should be Integers" });
    if (limitNum > MAX_PAGE_SIZE)
      return res
        .status(400)
        .json({ message: `Limit cannot be greater than ${maxLimit}` });
    if (pageNum <= 0)
      return res.status(400).json({ message: "Page should be greater than 0" });
    if (limitNum <= 0)
      return res
        .status(400)
        .json({ message: "Limit should be greater than 0" });

    //calculate offset
    const offset = (pageNum - 1) * limitNum;
    const products = await findProducts({ limit: limitNum, offset: offset });
    if (!products)
      return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ mesage: "Products found", products });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
};
export { addProduct, getProducts };
