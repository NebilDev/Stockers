import jwt, { decode } from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized request" });
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // if (!decodedToken)
    //   res.status(401).json({ message: "Unauthorized request" }); not needed because jwt throws an error and does not return null
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized request" });
  }
};

export default verifyJwt;
