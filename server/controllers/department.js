const { createConnection } = require("../config/database.js");

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    // Create and export MySQL connection
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT * FROM departments");
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Department name is required" });
  }

  try {
    const connection = await createConnection();
    await connection.query("INSERT INTO departments (name) VALUES (?)", [name]);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a department
exports.editDepartment = async (req, res) => {
  const { id, name } = req.body;
  if (!name && !id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const connection = await createConnection();
    const [result] = await connection.query(
      "UPDATE departments SET name = ? WHERE id = ?",
      [name, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.body;
  try {
    const connection = await createConnection();
    const [result] = await connection.query(
      "DELETE FROM departments WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ success: true, message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
