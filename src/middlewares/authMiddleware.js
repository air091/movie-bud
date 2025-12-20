import { jwtVerify } from "jose";
import { findUserById } from "../models/userModels.js";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const authMiddleware = async (request, response, next) => {
  // get our token
  let token;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  } else if (request.cookies?.jwt) {
    token = request.cookies.jwt;
  }
  // check if there is a token before responding to a request
  if (!token)
    return response
      .status(401)
      .json({ status: "failed", message: "Not authorized or no token" });

  try {
    // translate our token into our data
    const { payload } = await jwtVerify(token, secret);

    // converting our payload's data to database data
    const user = await findUserById(payload.id);

    // check if there is a user with that payload
    if (!user)
      return response
        .status(401)
        .json({ status: "failed", message: "User no longer exist" });
    // attached the authenticated user to the request object for handling requests
    request.user = user;
    next();
  } catch (error) {
    console.error(`Middleware failed ${error}`);
    return response.status(401).json({ status: "failed", message: error });
  }
};
