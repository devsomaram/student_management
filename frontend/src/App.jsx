import { useEffect, useState } from "react";

import StudentForm from "./components/studentForm";
import StudentList from "./components/studentList";

import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // GET ALL STUDENTS
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const result = await getAllStudents();
      setStudents(result.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  // LOAD STUDENTS WHEN COMPONENT MOUNTS
  useEffect(() => {
    fetchStudents();
  }, []);

  // CREATE OR UPDATE STUDENT
  const handleSubmit = async (studentData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, studentData);
        setMessage("Student updated successfully");
        setEditingStudent(null);
      } else {
        await createStudent(studentData);
        setMessage("Student created successfully");
      }

      await fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Operation failed");
    }
  };

  // DELETE STUDENT
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      await deleteStudent(id);
      setMessage("Student deleted successfully");

      if (editingStudent?._id === id) {
        setEditingStudent(null);
      }

      await fetchStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete student");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Student Management System</h1>
        <p>Manage your student records easily</p>
      </header>

      {message && (
        <div className="message">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      <StudentForm
        onSubmit={handleSubmit}
        editingStudent={editingStudent}
        onCancel={() => setEditingStudent(null)}
      />

      <section className="list-section">
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <StudentList
            students={students}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}

export default App;
