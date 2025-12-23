import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="w-full max-w-32 min-w-42">
      <ul>
        <li>
          <Link
            to={""}
            className="block py-1 px-3 rounded-md bg-white hover:bg-stone-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="movies"
            className="block py-1 px-3 rounded-md bg-white hover:bg-stone-200"
          >
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
