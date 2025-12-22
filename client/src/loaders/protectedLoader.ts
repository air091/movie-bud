import { redirect } from "react-router-dom";

export const protectedLoader = async () => {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    credentials: "include",
  });

  if (!response.ok) return redirect("/login");
  return null;
};
