import db from "../config/database.js";

const findEmployeeByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM employees WHERE username = ?", [
    username,
  ]);
  return rows[0] || null;
};

const createEmployee = async ({
  first_name,
  last_name,
  username,
  role,
  password,
}) => {
  const [result] = await db.query(
    "INSERT INTO employees (first_name, last_name, username, role, password) VALUES (?,?,?,?,?)",
    [first_name, last_name, username, role, password],
  );
  return result;
};

export { findEmployeeByUsername, createEmployee };
