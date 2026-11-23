import { useState, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  age: "",
  course: "",
};

const StudentForm = ({ onSubmit, editingStudent, onCancel }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        ...editingStudent,
        age: String(editingStudent.age),
      });
    } else {
      setFormData(initialState);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: Number(formData.age),
    });
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      <input
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        name="age"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <input
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

      {editingStudent && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;
