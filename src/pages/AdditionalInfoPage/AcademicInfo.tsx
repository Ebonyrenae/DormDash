import react, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./AcademicInfo.css";

export default function AcademicInfo() {
  const navigate = useNavigate();

  const [major_id, setMajor] = useState<string | null>(null);
  const [year, setYear] = useState("");
  const [college, setCollege] = useState("");
  const [majors, setMajors] = useState<{ id: string; name: string }[]>([]);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const userId = 2; // 👈 temporary testing user

  
  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

  useEffect(() => {
  fetch("https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api_Dob/GetMajors.php",)
    .then(res => res.json())
    .then(data => setMajors(data))
    .catch(err => console.error(err));
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (!major_id || !year || !college) {
      alert("Please fill out all academic fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api_Dob/AcademicInfo.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            major_id: major_id,   
            year_in_school: year,   
            college: college,
            userId: userId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Saved successfully!");
        setIsSuccess(true);

        // ✅ Navigate AFTER success
        navigate("/location");
      } else {
        setMessage(data.message || "Failed to save.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Outer-container">

        <h2 className="Academic-heading">Academic Information</h2>

        <p className="text-below">
          Find jobs and DormDashers on your campus
        </p>

        {/* College */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for your University/College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Major */}
        <div className="center-section">
            <p className="section-label">Major</p>
            <Autocomplete
            options={majors || []}
            getOptionLabel={(option) => option.name}
             value={majors.find((m) => m.id === major_id) || null}
             onChange={(event, newValue) => {setMajor(newValue ? newValue.id : ""); }}
             renderInput={(params) => (
             <TextField
             {...params}
             className="dropdown-wrapper"  // 👈 reuse your CSS class
             placeholder="Select Major"
             variant="outlined"
             fullWidth/>)}/>
</div>

        {/* Year */}
        <div className="center-section">
          <p className="section-label">Year</p>
          <select
            className="dropdown"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="bottom-section">
          <div className="buttons-row">
            <p
              className="previous-text"
              onClick={() => navigate("/gender")}
            >
              Previous
            </p>

            <button className="button-n" type="submit">
              Next Step
            </button>
          </div>

          
        </div>

        {message && <p>{message}</p>}

      </div>
    </form>
  );
}

