import { useState } from "react";
import type { IUserRegisterCredentials } from "../../interfaces/userInterfacecs";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState<IUserRegisterCredentials>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const registerAPI = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(`Register API failed: ${error}`);
      setError(error as string);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (credentials.password !== confirmPassword) {
      setError("Password do not match");
      setConfirmPassword("");
      return null;
    }

    await registerAPI();

    setError(null);
    setCredentials({ name: "", email: "", password: "" });
    setConfirmPassword("");
  };

  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>
        {error && <p className="bg-red-200">{error}</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="off"
            value={credentials.name}
            onChange={handleInputChange}
            className="block border"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="off"
            value={credentials.email}
            onChange={handleInputChange}
            className="block border"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={handleInputChange}
            className="block border"
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="block border"
          />
        </div>
        <button type="submit" className="block border">
          Register
        </button>
      </form>
      <Link to="/login" className="text-blue-500">
        Login
      </Link>
    </div>
  );
};

export default Register;
