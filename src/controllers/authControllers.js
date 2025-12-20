import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

export const register = async (request, response) => {
  try {
    const { name, email, role = "user", password } = request.body;
    if (!name || !email || !password)
      return response
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    // check email exist
    const isUserExist = await findUserByEmail(email);
    if (isUserExist)
      return response
        .status(400)
        .json({ status: "failed", message: "Email is already in use" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await createUser(name, email, role, hashPassword);

    // generate a token
    const token = await generateToken(user.id, response);
    return response.status(200).json({ status: "success", user, token });
  } catch (error) {
    console.error(`Register failed ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password)
      return response
        .status(400)
        .json({ status: "failed", message: "All fields are required" });

    // check email exist
    const user = await findUserByEmail(email);
    if (!user)
      return response
        .status(404)
        .json({ status: "failed", message: "Email not found" });

    // check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response
        .status(401)
        .json({ status: "failed", message: "Email or password is incorrect" });

    // generate a token
    const token = await generateToken(user.id, response);

    return response.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error(`Register failed ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};

export const logout = async (request, response) => {
  try {
    response.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    return response
      .status(200)
      .json({ status: "success", message: "User logged out successfully" });
  } catch (error) {
    console.error(`Logout failed ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};
