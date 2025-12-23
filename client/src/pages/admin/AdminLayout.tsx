import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import type { IUser } from "../../interfaces/userInterfaces";
import ProfileModal from "../../components/client/home-components/ProfileModal";
import Sidebar from "../../components/admin/Sidebar";

const AdminLayout = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  useEffect(() => {
    const meAPI = async () => {
      const response = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data);
      setUser(data.user);
    };
    meAPI();
  }, []);

  return (
    <div className="max-w-720 min-w-desktop-standard">
      <header className="flex justify-between py-2 px-4 border">
        <h1>
          MovieBud <span className="font-bold">Admin</span>
        </h1>
        <div className="flex gap-x-4">
          <span>
            Welcome,{" "}
            {user ? (
              <div className="relative inline-block">
                <span
                  className="cursor-pointer"
                  onClick={() => setOpenProfile((prev) => !prev)}
                >
                  {user.name}
                </span>
                {openProfile && <ProfileModal />}
              </div>
            ) : (
              ""
            )}
          </span>

          <Link to="/" className="text-blue-500">
            Go to client
          </Link>
        </div>
      </header>
      <main className="px-4 py-2 flex gap-x-2">
        <Sidebar />
        <div className="border-2 border-blue-500 w-full">
          <Outlet />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default AdminLayout;
