import { useState } from "react";
import axios from "axios";

function StudyForm({ onSaved }) {
  // Get today's date in YYYY-MM-DD format
  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [form, setForm] = useState({
    date: getToday(),
    physics: "",
    chemistry: "",
    mathematics: "",
  });

  // Handle subject inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Submit study
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Always use today's date
      const today = getToday();

      const studyData = {
        date: today,
        physics: Number(form.physics) || 0,
        chemistry: Number(form.chemistry) || 0,
        mathematics: Number(form.mathematics) || 0,
      };

      await axios.post(
        "http://localhost:5000/api/study",
        studyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Study saved");

      // Refresh dashboard
      onSaved();

      // Clear subjects but keep today's date
      setForm({
        date: getToday(),
        physics: "",
        chemistry: "",
        mathematics: "",
      });

    } catch (error) {
      console.log(error);

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

      {/* DATE */}

      <label>Date</label>

      <input
        type="date"
        name="date"
        value={form.date}
        readOnly
      />

      {/* PHYSICS */}

      <label>
        Physics (minutes)
      </label>

      <input
        type="number"
        name="physics"
        placeholder="e.g. 90"
        value={form.physics}
        onChange={handleChange}
        min="0"
      />

      {/* CHEMISTRY */}

      <label>
        Chemistry (minutes)
      </label>

      <input
        type="number"
        name="chemistry"
        placeholder="e.g. 60"
        value={form.chemistry}
        onChange={handleChange}
        min="0"
      />

      {/* MATHEMATICS */}

      <label>
        Mathematics (minutes)
      </label>

      <input
        type="number"
        name="mathematics"
        placeholder="e.g. 120"
        value={form.mathematics}
        onChange={handleChange}
        min="0"
      />

      {/* SUBMIT */}

      <button type="submit">
        Save Study
      </button>

    </form>
  );
}

export default StudyForm;
