// import { useEffect, useState } from "react";
// import axios from "axios";
// import StudyForm from "../components/StudyForm";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Dashboard({ setToken }) {
//   const navigate = useNavigate();
//   const [studies, setStudies] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchStudies = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         "http://localhost:5000/api/study",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setStudies(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchStudies();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     navigate("/login");
//   };

//   const totalMinutes = studies.reduce(
//     (sum, study) => sum + study.totalMinutes,
//     0
//   );

//   const totalHours = (totalMinutes / 60).toFixed(1);

//   const physicsMinutes = studies.reduce(
//   (sum, study) => sum + study.physics,
//   0
// );

// const chemistryMinutes = studies.reduce(
//   (sum, study) => sum + study.chemistry,
//   0
// );

// const mathematicsMinutes = studies.reduce(
//   (sum, study) => sum + study.mathematics,
//   0
// );

// const physicsHours = (physicsMinutes / 60).toFixed(1);
// const chemistryHours = (chemistryMinutes / 60).toFixed(1);
// const mathematicsHours = (mathematicsMinutes / 60).toFixed(1);

//   // ---------------- HEATMAP DATA ----------------

//   const currentYear = new Date().getFullYear();

//   const studyMap = {};

//   studies.forEach((study) => {
//     studyMap[study.date] = study;
//   });

//   const startDate = new Date(currentYear, 0, 1);

//   // Start from Sunday before/at Jan 1
//   startDate.setDate(
//     startDate.getDate() - startDate.getDay()
//   );

//   const endDate = new Date(currentYear, 11, 31);

//   // End at Saturday after Dec 31
//   endDate.setDate(
//     endDate.getDate() + (6 - endDate.getDay())
//   );

//   const heatmapDays = [];

//   for (
//     let date = new Date(startDate);
//     date <= endDate;
//     date.setDate(date.getDate() + 1)
//   ) {
//     heatmapDays.push(new Date(date));
//   }

//   // 7 rows × columns
//   const weeks = [];

//   for (let i = 0; i < heatmapDays.length; i += 7) {
//     weeks.push(heatmapDays.slice(i, i + 7));
//   }

//   // Month positions
//   const months = [];

//   weeks.forEach((week, weekIndex) => {
//     week.forEach((date) => {
//       if (
//         date.getDate() === 1 &&
//         date.getFullYear() === currentYear
//       ) {
//         months.push({
//           name: date.toLocaleString("default", {
//             month: "short",
//           }),
//           weekIndex,
//         });
//       }
//     });
//   });

//   return (
//     <div className="dashboard">

//       <nav className="navbar">
//         <h2>PCM Streak</h2>

//         <div>
//           <span>Hi, {user?.name}</span>

//           <button onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </nav>

//       <main className="container">

//         <h1>Your Study Dashboard</h1>

//         <div className="stats">

//           <div className="stat-card">
//             <h3>Study Days</h3>
//             <p>{studies.length}</p>
//           </div>

//           {/* <div className="stat-card">
//             <h3>Total Hours</h3>
//             <p>{totalHours}</p>
//           </div> */}
//           <div className="stat-card total-hours-card">

//   <h3>Total Hours</h3>

//   <p>{totalHours}</p>

//   <div className="subject-breakdown">

//     <div>
//       <span>Physics</span>
//       <strong>{physicsHours}h</strong>
//     </div>

//     <div>
//       <span>Chemistry</span>
//       <strong>{chemistryHours}h</strong>
//     </div>

//     <div>
//       <span>Mathematics</span>
//       <strong>{mathematicsHours}h</strong>
//     </div>

//   </div>

// </div>

//           <div className="stat-card">
//             <h3>Sessions</h3>
//             <p>{studies.length}</p>
//           </div>

//         </div>

//         <StudyForm onSaved={fetchStudies} />

//         {/* GITHUB STYLE HEATMAP */}

//         <section className="activity">

//           <h2>Your Study Activity</h2>

//           <div className="github-heatmap">

//             {/* Month names */}

//             <div className="month-row">

//               {months.map((month, index) => (
//                 <span
//                   key={index}
//                   style={{
//                     gridColumnStart:
//                       month.weekIndex + 1,
//                   }}
//                 >
//                   {month.name}
//                 </span>
//               ))}

//             </div>

//             <div className="heatmap-main">

//               {/* Weekday labels */}

//               <div className="weekday-labels">
//                 <span></span>
//                 <span>Mon</span>
//                 <span></span>
//                 <span>Wed</span>
//                 <span></span>
//                 <span>Fri</span>
//                 <span></span>
//               </div>

//               {/* Days */}

//               <div className="weeks">

//                 {weeks.map((week, weekIndex) => (
//                   <div
//                     className="week"
//                     key={weekIndex}
//                   >

//                     {week.map((date) => {

//                       const dateString =
//                         `${date.getFullYear()}-${String(
//                           date.getMonth() + 1
//                         ).padStart(2, "0")}-${String(
//                           date.getDate()
//                         ).padStart(2, "0")}`;

//                       const study =
//                         studyMap[dateString];

//                       const minutes =
//                         study?.totalMinutes || 0;

//                       const isCurrentYear =
//                         date.getFullYear() === currentYear;

//                       return (
//                         <div
//                           key={dateString}
//                           className={`day level-${getLevel(
//                             minutes
//                           )} ${
//                             !isCurrentYear
//                               ? "outside-year"
//                               : ""
//                           }`}
//                           title={
//                             isCurrentYear
//                               ? `${dateString} • ${minutes} minutes`
//                               : ""
//                           }
//                         />
//                       );
//                     })}

//                   </div>
//                 ))}

//               </div>

//             </div>

//             {/* Legend */}

//             <div className="heatmap-legend">

//               <span>Less</span>

//               <div className="day level-0"></div>
//               <div className="day level-1"></div>
//               <div className="day level-2"></div>
//               <div className="day level-3"></div>
//               <div className="day level-4"></div>

//               <span>More</span>

//             </div>

//           </div>

//         </section>

//         {/* RECENT ACTIVITY */}

//         <section>

//           <h2>Recent Activity</h2>

//           {studies.slice(0, 10).map((study) => (
//             <div
//               className="activity-row"
//               key={study._id}
//             >
//               <strong>{study.date}</strong>

//               <span>
//                 Physics: {study.physics} min
//               </span>

//               <span>
//                 Chemistry: {study.chemistry} min
//               </span>

//               <span>
//                 Maths: {study.mathematics} min
//               </span>
//             </div>
//           ))}

//         </section>

//       </main>
//     </div>
//   );
// }

// function getLevel(minutes) {
//   if (minutes === 0) return 0;
//   if (minutes <= 30) return 1;
//   if (minutes <= 60) return 2;
//   if (minutes <= 120) return 3;
//   return 4;
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import StudyForm from "../components/StudyForm";
import { useNavigate, Link } from "react-router-dom";

function Dashboard({ setToken }) {
  const navigate = useNavigate();

  const [studies, setStudies] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ============================
  // FETCH STUDIES
  // ============================

  const fetchStudies = async () => {
    try {
      const token = localStorage.getItem("token");

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
      console.error(
        "FETCH STUDIES ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  // ============================
  // LOGOUT
  // ============================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);

    navigate("/login");
  };

  // ============================
  // STUDY CALCULATIONS
  // ============================

  const totalMinutes = studies.reduce(
    (sum, study) =>
      sum + (Number(study.totalMinutes) || 0),
    0
  );

  const totalHours = (
    totalMinutes / 60
  ).toFixed(1);

  // Physics

  const physicsMinutes = studies.reduce(
    (sum, study) =>
      sum + (Number(study.physics) || 0),
    0
  );

  // Chemistry

  const chemistryMinutes = studies.reduce(
    (sum, study) =>
      sum + (Number(study.chemistry) || 0),
    0
  );

  // Mathematics

  const mathematicsMinutes = studies.reduce(
    (sum, study) =>
      sum + (Number(study.mathematics) || 0),
    0
  );

  const physicsHours = (
    physicsMinutes / 60
  ).toFixed(1);

  const chemistryHours = (
    chemistryMinutes / 60
  ).toFixed(1);

  const mathematicsHours = (
    mathematicsMinutes / 60
  ).toFixed(1);

  // ============================
  // UNIQUE STUDY DAYS
  // ============================

  const studyDays = new Set(
    studies.map((study) => study.date)
  ).size;

  // ============================
  // HEATMAP DATA
  // ============================

  const currentYear =
    new Date().getFullYear();

  const studyMap = {};

  studies.forEach((study) => {
    studyMap[study.date] = study;
  });

  // Start from January 1

  const startDate = new Date(
    currentYear,
    0,
    1
  );

  // Move to Sunday before/at Jan 1

  startDate.setDate(
    startDate.getDate() -
      startDate.getDay()
  );

  // December 31

  const endDate = new Date(
    currentYear,
    11,
    31
  );

  // Move to Saturday after Dec 31

  endDate.setDate(
    endDate.getDate() +
      (6 - endDate.getDay())
  );

  // ============================
  // CREATE HEATMAP DAYS
  // ============================

  const heatmapDays = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(
      date.getDate() + 1
    )
  ) {
    heatmapDays.push(
      new Date(date)
    );
  }

  // ============================
  // CREATE WEEKS
  // ============================

  const weeks = [];

  for (
    let i = 0;
    i < heatmapDays.length;
    i += 7
  ) {
    weeks.push(
      heatmapDays.slice(i, i + 7)
    );
  }

  // ============================
  // MONTH POSITIONS
  // ============================

  const months = [];

  weeks.forEach(
    (week, weekIndex) => {
      week.forEach((date) => {
        if (
          date.getDate() === 1 &&
          date.getFullYear() ===
            currentYear
        ) {
          months.push({
            name: date.toLocaleString(
              "default",
              {
                month: "short",
              }
            ),
            weekIndex,
          });
        }
      });
    }
  );

  // ============================
  // UI
  // ============================

  return (
    <div className="dashboard">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <h2>PCM Streak</h2>

        <div className="navbar-right">

          <Link
            to="/questions"
            className="question-bank-btn"
          >
            Question Bank
          </Link>

          <span>
            Hi, {user?.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      </nav>


      <main className="container">

        <h1>
          Your Study Dashboard
        </h1>


        {/* =========================
            STATS
        ========================= */}

        <div className="stats">

          {/* STUDY DAYS */}

          <div className="stat-card">

            <h3>Study Days</h3>

            <p>{studyDays}</p>

          </div>


          {/* TOTAL HOURS */}

          <div className="stat-card total-hours-card">

            <h3>Total Hours</h3>

            <p>{totalHours}</p>


            {/* SUBJECT BREAKDOWN */}

            <div className="subject-breakdown">

              <div>
                <span>
                  Physics
                </span>

                <strong>
                  {physicsHours}h
                </strong>
              </div>


              <div>
                <span>
                  Chemistry
                </span>

                <strong>
                  {chemistryHours}h
                </strong>
              </div>


              <div>
                <span>
                  Mathematics
                </span>

                <strong>
                  {mathematicsHours}h
                </strong>
              </div>

            </div>

          </div>


          {/* SESSIONS */}

          <div className="stat-card">

            <h3>Sessions</h3>

            <p>
              {studies.length}
            </p>

          </div>

        </div>


        {/* =========================
            STUDY FORM
        ========================= */}

        <StudyForm
          onSaved={fetchStudies}
        />


        {/* =========================
            GITHUB STYLE HEATMAP
        ========================= */}

        <section className="activity">

          <h2>
            Your Study Activity
          </h2>


          <div className="github-heatmap">

            {/* MONTH NAMES */}

            <div className="month-row">

              {months.map(
                (month, index) => (
                  <span
                    key={index}
                    style={{
                      gridColumnStart:
                        month.weekIndex +
                        1,
                    }}
                  >
                    {month.name}
                  </span>
                )
              )}

            </div>


            <div className="heatmap-main">

              {/* WEEKDAY LABELS */}

              <div className="weekday-labels">

                <span></span>

                <span>
                  Mon
                </span>

                <span></span>

                <span>
                  Wed
                </span>

                <span></span>

                <span>
                  Fri
                </span>

                <span></span>

              </div>


              {/* WEEKS */}

              <div className="weeks">

                {weeks.map(
                  (
                    week,
                    weekIndex
                  ) => (

                    <div
                      className="week"
                      key={weekIndex}
                    >

                      {week.map(
                        (date) => {

                          const dateString =
                            `${date.getFullYear()}-${String(
                              date.getMonth() +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}-${String(
                              date.getDate()
                            ).padStart(
                              2,
                              "0"
                            )}`;

                          const study =
                            studyMap[
                              dateString
                            ];

                          const minutes =
                            Number(
                              study?.totalMinutes
                            ) || 0;

                          const isCurrentYear =
                            date.getFullYear() ===
                            currentYear;

                          return (
                            <div
                              key={
                                dateString
                              }
                              className={`
                                day
                                level-${getLevel(
                                  minutes
                                )}
                                ${
                                  !isCurrentYear
                                    ? "outside-year"
                                    : ""
                                }
                              `}
                              title={
                                isCurrentYear
                                  ? `${dateString} • ${minutes} minutes`
                                  : ""
                              }
                            />
                          );
                        }
                      )}

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =========================
                HEATMAP LEGEND
            ========================= */}

            <div className="heatmap-legend">

              <span>
                Less
              </span>

              <div className="day level-0"></div>

              <div className="day level-1"></div>

              <div className="day level-2"></div>

              <div className="day level-3"></div>

              <div className="day level-4"></div>

              <span>
                More
              </span>

            </div>

          </div>

        </section>


        {/* =========================
            RECENT ACTIVITY
        ========================= */}

        <section>

          <h2>
            Recent Activity
          </h2>


          {studies.length === 0 ? (

            <p>
              No study activity yet.
            </p>

          ) : (

            studies
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

              ))

          )}

        </section>

      </main>

    </div>
  );
}


// ============================
// HEATMAP LEVEL
// ============================

function getLevel(minutes) {

  if (minutes === 0) {
    return 0;
  }

  if (minutes <= 30) {
    return 1;
  }

  if (minutes <= 60) {
    return 2;
  }

  if (minutes <= 120) {
    return 3;
  }

  return 4;
}


export default Dashboard;