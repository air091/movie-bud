import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../interfaces/userInterfacecs";

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const logoutAPI = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) navigate("/");
    } catch (error) {
      console.error(`Logout API failed :${error}`);
    }
  };
  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await logoutAPI();
  };

  useEffect(() => {
    const meAPI = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(`Me API failed ${error}`);
      }
    };
    meAPI();
  }, []);

  return (
    <div>
      <header>
        <p>Welcome, {user ? user.name : ""}</p>
      </header>
      <button onClick={handleLogout} className="block border">
        Logout
      </button>
    </div>
  );
};

export default Home;
