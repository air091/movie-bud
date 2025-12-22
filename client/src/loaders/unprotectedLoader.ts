import { redirect } from "react-router-dom";

export const unprotectedLoader = async () => {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    credentials: "include",
  });
  if (response.ok) return redirect("/");
  return null;
};
