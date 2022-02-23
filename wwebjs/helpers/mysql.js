/* eslint-disable no-undef */
const mysql = require("mysql2/promise");

const createConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "test",
  });
};

const lerEmail = async (email) => {
  const connection = await createConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM employees WHERE email = ? LIMIT 1",
    [email]
  );
  if (rows.length > 0) return rows[0];
  return false;
};

const lerNome = async (name) => {
  const connection = await createConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM employees WHERE name = ? LIMIT 1",
    [name]
  );
  if (rows.length > 0) return rows[0];
  return false;
};

module.exports = {
  createConnection,
  lerNome,
  lerEmail,
};
