import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { IUser } from "../interfaces/userInterfaces";
import ProfileModal from "../components/client/home-components/ProfileModal";
import Movies from "../components/client/home-components/Movies";

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

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
    <div className="max-w-720 min-w-desktop-standard">
      <div className="border">
        <header className="flex justify-between py-2 px-4 border">
          <h1>MoviBud</h1>
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

            {user?.user_role === "admin" ? (
              <Link to="/admin" className="text-blue-500">
                Go to admin
              </Link>
            ) : null}
          </div>
        </header>

        {/****** MOVIES ******/}
        <main className="border px-4">
          <Movies />
        </main>
      </div>
    </div>
  );
};

export default Home;
