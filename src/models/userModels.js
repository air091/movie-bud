import pool from "../configs/database.js";

export const findAllUsers = async () => {
  const selectQuery = `SELECT id, name, email, user_role, created_at, updated_at FROM users`;
  try {
    const result = await pool.query(selectQuery);
    return result.rows;
  } catch (error) {
    console.error("Find all users model failed");
    throw error;
  }
};

export const findUserById = async (userId) => {
  const selectQuery = `SELECT id, name, email, user_role, created_at, updated_at FROM users WHERE id = $1`;
  try {
    const result = await pool.query(selectQuery, [userId]);
    return result.rows[0];
  } catch (error) {
    console.error("Find user by id model failed");
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  const selectQuery = `SELECT * FROM users WHERE email = $1`;
  try {
    const result = await pool.query(selectQuery, [email]);
    return result.rows[0];
  } catch (error) {
    console.error("Find user by email model failed");
    throw error;
  }
};

export const createUser = async (name, email, role, password) => {
  const insertQuery = `INSERT INTO users (name, email, user_role, password)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id, name, email, user_role, created_at, updated_at`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(insertQuery, [
      name,
      email,
      role,
      password,
    ]);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Create user model failed");
    throw error;
  } finally {
    client.release();
  }
};
