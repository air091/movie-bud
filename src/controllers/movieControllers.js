import {
  createMovie,
  findAllMovies,
  removeMovie,
  updateMovie,
} from "../models/moviesModels.js";
import { findUserById } from "../models/userModels.js";

export const getAllMovies = async (request, response) => {
  try {
    const movies = await findAllMovies();
    if (!movies.length)
      return response
        .status(404)
        .json({ status: "failed", message: "Movies not found" });
    return response.status(200).json({ status: "success", movies });
  } catch (error) {
    console.error(`Get all controller ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};

export const postMovie = async (request, response) => {
  try {
    const { title, overview, duration, genres, posterUrl } = request.body;
    // check if the  user is admin
    const user = await findUserById(request.user.id);

    if (user.user_role !== "admin")
      return response
        .status(401)
        .json({ status: "failed", message: "User not authorized" });

    const movie = await createMovie(
      title,
      overview,
      duration,
      genres,
      posterUrl,
      request.user.id
    );
    return response.status(201).json({
      status: "success",
      message: "Movie created successfully",
      movie,
    });
  } catch (error) {
    console.error(`Post movie controller ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};

export const putMovie = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, overview, duration, genres, posterUrl } = request.body;

    // check if the  user is admin
    const user = await findUserById(request.user.id);
    if (user.user_role !== "admin")
      return response
        .status(401)
        .json({ status: "failed", message: "User not authorized" });

    const movie = await updateMovie(id, {
      title,
      overview,
      duration,
      genres,
      posterUrl,
      updatedBy: request.user.id,
    });
    if (!movie)
      return response
        .status(404)
        .json({ status: "failed", message: "Movie not found" });
    return response.status(200).json({
      status: "success",
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    console.error(`Update movie controller ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};

export const deleteMovie = async (request, response) => {
  try {
    const { id } = request.params;
    const movie = await removeMovie(id);
    if (!movie)
      return response
        .status(404)
        .json({ status: "failed", message: "Movie not found" });
    return response
      .status(200)
      .json({ status: "success", message: "Movie deleted successfully" });
  } catch (error) {
    console.error(`Delete movie controller ${error}`);
    return response.status(500).json({ status: "failed", message: error });
  }
};
