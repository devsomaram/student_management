const express = require("express");

const router = express.Router();

const {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

// CREATE
router.post("/", createStudent);

// READ
router.get("/", getAllStudents);

// UPDATE
router.put("/:id", updateStudent);

// DELETE
router.delete("/:id", deleteStudent);

module.exports = router;
