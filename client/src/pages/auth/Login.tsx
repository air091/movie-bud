import { useState } from "react";
import type { IUserLoginCredentials } from "../../interfaces/userInterfacecs";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState<IUserLoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginAPI = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(`Login failed: ${error}`);
      setError(error as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await loginAPI();
    setError(null);
    setCredentials({ email: "", password: "" });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-200">{error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            autoComplete="off"
            required
            className="border block"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
            className="border block"
          />
        </div>
        <button type="submit" className="border">
          Login
        </button>
      </form>
      <Link to="/register" className="text-blue-500">
        Register
      </Link>
    </div>
  );
};

export default Login;
