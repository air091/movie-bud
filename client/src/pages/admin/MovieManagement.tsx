import { useEffect, useState } from "react";
import AdminMovieCard from "../../components/admin/AdminMovieCard";
import type { IMovieProperties } from "../../interfaces/movieInterfaces";

const MovieManagement = () => {
  const [movies, setMovies] = useState<IMovieProperties[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("http://localhost:8080/api/movies", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message);
      setMovies(data.movies);
    };
    getMovies();
  }, []);

  return (
    <>
      Movies
      <div>
        {movies
          ? movies.map((movie) => (
              <div
                key={movie.id}
                className="inline-block align-top w-full max-w-40 border rounded-md mr-4 mb-4 mt-2 text-wrap bg-stone-900 text-white text-sm"
              >
                <AdminMovieCard poster={movie.poster_url} title={movie.title} />
              </div>
            ))
          : "No movies"}
      </div>
    </>
  );
};

export default MovieManagement;
