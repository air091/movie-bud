import { useNavigate } from "react-router-dom";

const ProfileModal = () => {
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

  return (
    <nav className="absolute right-0 border top-10 px-2 py-1">
      <ul>
        <li>Profile</li>
        <li>
          <button onClick={handleLogout} className="cursor-pointer">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileModal;
