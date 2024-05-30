const mysql = require("mysql2/promise");

// Function to create and export MySQL connection
async function createConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Babita@5396",
    database: "assessment",
  });
  return connection;
}

module.exports = { createConnection };
