import { findProductByModel, createProduct } from "../models/product.model.js";

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

export { addProduct };
