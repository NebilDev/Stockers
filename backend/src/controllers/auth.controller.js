import {
  findEmployeeByUsername,
  createEmployee,
} from "../models/employee.model.js";
import bcrypt from "bcrypt";
import tokenGenerator from "../utils/tokenGenerator.js";
const registerEmployee = async (req, res) => {
  try {
    //recieve request data
    const { first_name, last_name, username, role, password } = req.body;

    //validate data
    if (!first_name || !last_name || !username || !role || !password)
      return res.status(400).json({ message: "All fields are requires!" });
    if (password.length > 50)
      return res.status(400).json({ message: "Password too long!" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password too short!" });

    //check if employee exists
    const existingEmployee = await findEmployeeByUsername(username);
    if (existingEmployee)
      return res.status(409).json({ message: "Employee already exists!" });

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new employee
    const result = await createEmployee({
      first_name,
      last_name,
      username,
      role,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Employee created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginEmployee = async (req, res) => {
  try {
    //recieve data
    const { username, password } = req.body;

    //validate data
    if (!username || !password)
      return res.status(400).json({ message: "All fields are required!" });

    //check if employee exists
    const employee = await findEmployeeByUsername(username);
    if (!employee)
      return res.status(401).json({ message: "Invalid credentials" });
    //check password
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = tokenGenerator(employee.id, employee.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({ message: "Logged in successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutEmployee = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logged out successfully",
  });
};
export { registerEmployee, loginEmployee, logoutEmployee };
