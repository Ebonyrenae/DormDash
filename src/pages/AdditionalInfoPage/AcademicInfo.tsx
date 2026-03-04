import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import schoolData from "../../schools.json";
import "./AcademicInfo.css";

export default function AcademicInfo() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // State initialized from localStorage
  const [college, setCollege] = useState(localStorage.getItem("college") || "");
  const [majorId, setMajorId] = useState<string | null>(localStorage.getItem("major_id") || "");
  const [year, setYear] = useState(localStorage.getItem("year_in_school") || "");
  const [customMajorText, setCustomMajorText] = useState(localStorage.getItem("custom_major") || "");
  const [majors, setMajors] = useState<{ id: string; field: string }[]>([]);
  const [message, setMessage] = useState("");

  const years = ["Freshman", "Sophomore", "Junior", "Senior"];

  // Fetch majors on mount
  useEffect(() => {
  fetch("https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/GetMajors.php",)
    .then(res => res.json())
    .then(data => setMajors(data))
    .catch(err => console.error(err));
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!majorId || !year || !college) {
      alert("Please fill out all academic fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/AcademicInfo.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            major_id: majorId,
            year_in_school: year,
            college: college,
            user_id: userId,
            custom_major: customMajorText || null,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Only clear storage once the final submission is successful
        const keysToRemove = ["major_id", "year_in_school", "college", "custom_major", "dob", "month", "day", "year", "selectedGender"];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Failed to save.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="onboarding-bg">
      <form className="onboarding-card academic-card" onSubmit={handleSubmit}>
        <h2 className="onboarding-title">Academic Information</h2>
        <p className="onboarding-subtitle">Find jobs and DormDashers on your campus</p>

        {/* College Search */}
        <div className="input-group">
          <label className="input-label">Where do you go to school?</label>
          <Autocomplete
            options={schoolData}
            getOptionLabel={(option) => option.name}
            value={schoolData.find((s) => s.name === college) || null}
            onChange={(_, newValue) => {
              const val = newValue ? newValue.name : "";
              setCollege(val);
              localStorage.setItem("college", val); // SAVE
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for your school..."
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#4CAF50', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>

        {/* Major Selection */}
        <div className="input-group">
          <label className="input-label">What is your major?</label>
          <Autocomplete
            options={majors || []}
            getOptionLabel={(option) => option.field || ""}
            value={majors.find((m) => m.id === majorId) || null}
            onChange={(_, newValue) => {
              const val = newValue ? newValue.id : "";
              setMajorId(val);
              localStorage.setItem("major_id", val); // SAVE
              if (val !== "22") {
                setCustomMajorText("");
                localStorage.removeItem("custom_major");
              }
            }}
            renderInput={(params) => <TextField {...params} placeholder="Select Major" variant="outlined" />}
          />
          {majorId === "22" && (
            <TextField
              sx={{ mt: 2 }}
              label="Type your major"
              value={customMajorText}
              onChange={(e) => {
                setCustomMajorText(e.target.value);
                localStorage.setItem("custom_major", e.target.value); // SAVE
              }}
              fullWidth
              variant="outlined"
            />
          )}
        </div>

        {/* Year Selection */}
        <div className="input-group">
          <label className="input-label">Current Year</label>
          <Autocomplete
            options={years}
            value={year || null}
            onChange={(_, newValue) => {
              const val = newValue || "";
              setYear(val);
              localStorage.setItem("year_in_school", val); // SAVE
            }}
            renderInput={(params) => <TextField {...params} placeholder="Select your year" variant="outlined" />}
          />
        </div>

        <div className="onboarding-footer">
          <button type="submit" className="next-btn">Get To Dashing</button>
          <div className="sub-nav-links">
            <p className="back-link" onClick={() => navigate("/about-yourself")}>Previous</p>
            <p className="skip-link" onClick={() => navigate("/dashboard")}>Skip for now</p>
          </div>
        </div>
        
        {message && <p className="error-msg">{message}</p>}
      </form>
    </div>
  );
}