import pool from "../configs/database.js";

export const findAllMovies = async () => {
  const selectQuery = `SELECT * FROM movies`;
  try {
    const result = await pool.query(selectQuery);
    return result.rows;
  } catch (error) {
    console.error("Find all movies model failed");
    throw error;
  }
};

export const createMovie = async (
  title,
  overview,
  duration,
  genres,
  posterUrl,
  createdBy,
) => {
  const insertQuery = `INSERT INTO movies (title, overview, duration, genres, poster_url, created_by)
                      VALUES ($1, $2, $3, $4, $5, $6)
                      RETURNING *`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(insertQuery, [
      title,
      overview,
      duration,
      genres,
      posterUrl,
      createdBy,
    ]);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Create movie model failed");
    throw error;
  } finally {
    client.release();
  }
};

export const updateMovie = async (movieId, data) => {
  const columns = {
    title: "title",
    overview: "overview",
    duration: "duration",
    genres: "genres",
    posterUrl: "poster_url",
    updatedBy: "updated_by",
  };
  const fields = [];
  const values = [];
  let i = 1;

  for (const [key, column] of Object.entries(columns)) {
    if (data[key] !== undefined) {
      fields.push(`${column} = $${i++}`);
      values.push(data[key]);
    }
  }
  if (!fields.length) throw new Error("No fields to update");
  const updateQuery = `UPDATE movies
                      SET ${fields.join(", ")}
                      WHERE id = $${i}
                      RETURNING *`;
  values.push(movieId);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(updateQuery, values);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Update movie model failed");
    throw error;
  } finally {
    client.release();
  }
};

export const removeMovie = async (movieId) => {
  const deleteQuery = `DELETE FROM movies
                      WHERE id = $1`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(deleteQuery, [movieId]);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Delete movie model failed");
    throw error;
  } finally {
    client.release();
  }
};
