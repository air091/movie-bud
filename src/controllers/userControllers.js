import { findAllUsers, findUserById } from "../models/userModels.js";

export const getAllUsers = async (request, response) => {
  try {
    const users = await findAllUsers();
    if (!users.length)
      return response
        .status(404)
        .json({ status: "failed", message: "Users not found" });

    return response.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.error(`Get all users controller failed ${error}`);
    return response.status(500).json({ message: error });
  }
};

export const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await findUserById(id);
    if (!user)
      return response
        .status(404)
        .json({ status: "failed", message: "User not found" });
    return response.status(200).json({ status: "success", user });
  } catch (error) {
    console.error(`Get user by ID controller failed ${error}`);
    return response.status(500).json({ message: error });
  }
};
