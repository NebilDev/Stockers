import db from "../config/database.js";

const findProductByModel = async (model) => {
  const [rows] = await db.query(
    "SELECT id, catagory, brand, model FROM products WHERE model = ?",
    [model],
  );
  return rows[0] || null;
};

const createProduct = async ({
  category,
  brand,
  model,
  buying_price,
  selling_price,
  quantity,
  minimum_quantity,
}) => {
  const [result] = await db.query(
    "INSERT INTO products (category, brand, model, buying_price, selling_price, quantity, minimum_quantity) VALUES (?,?,?,?,?,?,?)",
    [
      category,
      brand,
      model,
      buying_price,
      selling_price,
      quantity,
      minimum_quantity,
    ],
  );

  return result;
};
export { findProductByModel, createProduct };
