import { SignJWT } from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const generateToken = async (userId, response) => {
  // add data
  const payload = { id: userId };
  // create token
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(secret);

  response.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * parseInt(process.env.JWT_EXPIRES_IN),
  });

  return token;
};

export default generateToken;
