import { useState } from "react";
import axios from "axios";

function StudyForm({ onSaved }) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [form, setForm] = useState({
    date: today,
    physics: "",
    chemistry: "",
    mathematics: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/study",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Study saved");

      onSaved();

      setForm({
        ...form,
        physics: "",
        chemistry: "",
        mathematics: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save study"
      );
    }
  };

  return (
    <form
      className="study-form"
      onSubmit={handleSubmit}
    >
      <h2>Add Study</h2>

      <label>Date</label>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <label>Physics (minutes)</label>

      <input
        type="number"
        name="physics"
        placeholder="e.g. 90"
        value={form.physics}
        onChange={handleChange}
        min={0}
      />

      <label>Chemistry (minutes)</label>

      <input
        type="number"
        name="chemistry"
        placeholder="e.g. 60"
        value={form.chemistry}
        onChange={handleChange}
        min={0}
      />

      <label>Mathematics (minutes)</label>

      <input
        type="number"
        name="mathematics"
        placeholder="e.g. 120"
        value={form.mathematics}
        onChange={handleChange}
        min={0}
      />

      <button type="submit">
        Save Study
      </button>
    </form>
  );
}

export default StudyForm;