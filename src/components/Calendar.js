import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CalendarPlanner = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  // Store plans per day in an object: { '1': [...plans], '2': [...], ... }
  const [plans, setPlans] = useState({});

  const daysInJune = 30;
  // Adjust getDay() so Monday=0, Sunday=6 (to align with table headers)
  const jsStartDay = new Date("June 1, 2025").getDay();
  const startDay = jsStartDay === 0 ? 6 : jsStartDay - 1;

  // Temporary state to hold textareas input for the selected day
  const [tempPlans, setTempPlans] = useState(
    Array(24).fill("") // 24 hours, initially empty strings
  );

  // When a day is selected, load existing plans if any, else empty
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setTempPlans(plans[day] || Array(24).fill(""));
  };

  const handlePlanChange = (hourIndex, value) => {
    const newTempPlans = [...tempPlans];
    newTempPlans[hourIndex] = value;
    setTempPlans(newTempPlans);
  };

  const handleSave = () => {
    setPlans((prevPlans) => ({
      ...prevPlans,
      [selectedDay]: tempPlans,
    }));
    setSelectedDay(null);
  };

  const renderCalendar = () => {
    const weeks = [];
    let day = 1;

    for (let week = 0; week < 6; week++) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < startDay) || day > daysInJune) {
          row.push(<td key={`empty-${week}-${i}`}></td>);
        } else {
          // Highlight if plans exist for this day
          const hasPlan = plans[day] && plans[day].some((p) => p.trim() !== "");
          row.push(
            <td
              key={`day-${day}`}
              className={`date-cell ${selectedDay === day ? "selected" : ""} ${
                hasPlan ? "has-plan" : ""
              }`}
              onClick={() => handleDayClick(day)}
              style={{ cursor: "pointer", userSelect: "none" }}
              title={hasPlan ? "You have plans on this day" : ""}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={`week-${week}`}>{row}</tr>);
    }

    return weeks;
  };

  const renderPlanner = () => {
    return (
      <div
        className="timestamp mt-4"
        style={{
          background: "#f9f9f9",
          borderRadius: "10px",
          padding: "1rem",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setSelectedDay(null)}
        >
          Back to Calendar
        </button>
        <h5>Planner for June {selectedDay}, 2025</h5>
        {tempPlans.map((planText, hour) => {
          const displayHour = hour % 12 === 0 ? 12 : hour % 12;
          const period = hour < 12 ? "AM" : "PM";
          return (
            <div className="mb-3" key={`hour-${hour}`}>
              <label className="form-label fw-bold">{`${displayHour}:00 ${period}`}</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Write your plan..."
                value={planText}
                onChange={(e) => handlePlanChange(hour, e.target.value)}
              />
            </div>
          );
        })}
        <button className="btn btn-primary" onClick={handleSave}>
          Save Plans & Return to Calendar
        </button>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .date-cell {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            transition: background-color 0.3s ease;
          }
          .date-cell:hover {
            background-color: #e0e7ff;
          }
          .selected {
            background-color: #4f46e5;
            color: white;
            font-weight: bold;
            border-radius: 6px;
          }
          .has-plan {
            background-color: #a7f3d0;
            font-weight: 600;
            border-radius: 6px;
          }
        `}
      </style>
      <div
        className="container text-center d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #c1d8f0, #c2f0c1)",
          height: "100vh",
          padding: "1rem",
        }}
      >
        <div
          className="calendar bg-white p-4 rounded-4 shadow w-100"
          style={{ maxWidth: "900px" }}
        >
          {!selectedDay ? (
            <>
              <h3 id="calendar-title">June 2025</h3>
              <table
                className="table"
                id="calendar-table"
                style={{ tableLayout: "fixed" }}
              >
                <thead>
                  <tr>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                  </tr>
                </thead>
                <tbody>{renderCalendar()}</tbody>
              </table>
              <small style={{ color: "#22c55e" }}>
                Dates in green have saved plans.
              </small>
            </>
          ) : (
            renderPlanner()
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarPlanner;
