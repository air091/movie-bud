import { useEffect, useState } from "react";
import type { IMovieProperties } from "../../../interfaces/movieInterfaces";
import MovieCard from "./MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState<IMovieProperties[]>([]);

  useEffect(() => {
    const getMoviesAPI = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/movies", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message);

        setMovies(data.movies);
      } catch (error) {
        console.error(`Get movies API failed ${error}`);
      }
    };
    getMoviesAPI();
  }, []);

  return (
    <>
      <header>
        <h1>Movies</h1>
      </header>
      <div>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="inline-block align-top w-full max-w-40 border rounded-md mr-4 mb-4 mt-2"
          >
            <MovieCard title={movie.title} posterUrl={movie.poster_url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Movies;
