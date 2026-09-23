import { useEffect, useState } from "react";
import axios from "axios";

import StudyForm from "../components/StudyForm";
import { useNavigate } from "react-router-dom";

function Dashboard({ setToken }) {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchStudies = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/study",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null)
    navigate("/login")
  };

  const totalMinutes = studies.reduce(
    (sum, study) =>
      sum + study.totalMinutes,
    0
  );

  const totalHours = (
    totalMinutes / 60
  ).toFixed(1);

  return (
    <div className="dashboard">

      <nav className="navbar">
        <h2>PCM Streak</h2>

        <div>
          <span>
            Hi, {user?.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="container">

        <h1>Your Study Dashboard</h1>

        <div className="stats">

          <div className="stat-card">
            <h3>Study Days</h3>
            <p>{studies.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Hours</h3>
            <p>{totalHours}</p>
          </div>

          <div className="stat-card">
            <h3>Sessions</h3>
            <p>{studies.length}</p>
          </div>

        </div>

        <StudyForm
          onSaved={fetchStudies}
        />

        <section className="activity">

          <h2>
            Your Study Activity
          </h2>

          <div className="heatmap">

            {studies.map((study) => (
              <div
                key={study._id}
                className={`day level-${getLevel(
                  study.totalMinutes
                )}`}
                title={`${study.date} - ${study.totalMinutes} minutes`}
              />
            ))}

          </div>

        </section>

        <section>

          <h2>Recent Activity</h2>

          {studies
            .slice(0, 10)
            .map((study) => (
              <div
                className="activity-row"
                key={study._id}
              >
                <strong>
                  {study.date}
                </strong>

                <span>
                  Physics:{" "}
                  {study.physics} min
                </span>

                <span>
                  Chemistry:{" "}
                  {study.chemistry} min
                </span>

                <span>
                  Maths:{" "}
                  {study.mathematics} min
                </span>
              </div>
            ))}

        </section>

      </main>

    </div>
  );
}

function getLevel(minutes) {
  if (minutes === 0) return 0;
  if (minutes <= 30) return 1;
  if (minutes <= 60) return 2;
  if (minutes <= 120) return 3;

  return 4;
}

export default Dashboard;