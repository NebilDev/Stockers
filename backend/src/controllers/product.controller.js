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
    // validate data
    if (
      !category?.trim() ||
      !brand?.trim() ||
      !model?.trim() ||
      !buying_price ||
      !selling_price ||
      !minimum_quantity
    )
      return res.status(400).json({ message: "All fields are required!" });
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
    const existingProduct = await findProductByModel(model.trim());
    if (existingProduct)
      return res.status(409).json({ message: "Product already exists" });

    //create product
    // createProduct using model
    const result = await createProduct({
      category: category.trim().toLowerCase(),
      brand: brand.trim().toLowerCase(),
      model: model.trim().toLowerCase(),
      buying_price,
      selling_price,
      quantity: 0,
      minimum_quantity,
    });
    return res
      .status(200)
      .json({
        message: "product created sucessfully!",
        productId: result.insertId,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addProduct };
