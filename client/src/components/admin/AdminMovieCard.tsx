import { useEffect, useState } from "react";
import type { IUser } from "../../interfaces/userInterfaces";

interface IAdminMovieProps {
  title: string;
  poster: string;
}

const AdminMovieCard = ({ title, poster }: IAdminMovieProps) => {
  return (
    <>
      <div className="w-full h-60">
        <img
          className="w-full h-full object-center object-cover block rounded-t-md"
          src={poster}
          alt={title}
        />
      </div>
      <footer className="px-2 py-1">
        <span>{title}</span>
      </footer>
    </>
  );
};

export default AdminMovieCard;
