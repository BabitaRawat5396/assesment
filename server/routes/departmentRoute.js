const express = require("express");

const {
  getAllDepartments,
  createDepartment,
  editDepartment,
  deleteDepartment,
} = require("../controllers/department.js");

const { auth, isAdmin } = require("../middleware/auth.js");
const router = express.Router();

// Routes
router.get("/getAllDepartments", auth, isAdmin, getAllDepartments);
router.post("/createDepartment", auth, isAdmin, createDepartment);
router.put("/updateDepartment", auth, isAdmin, editDepartment);
router.delete("/deleteDepartment", auth, isAdmin, deleteDepartment);

module.exports = router;
