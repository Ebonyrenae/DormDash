import react, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./AcademicInfo.css";
import schoolData from "../../schools.json";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default function AcademicInfo() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  const savedMajor = localStorage.getItem("major_id") || "";
const savedYear = localStorage.getItem("year_in_school") || "";
const savedCollege = localStorage.getItem("college") || "";
const savedCustom = localStorage.getItem("custom_major") || "";
 

  const [major_id, setMajorid] = useState<string | null>(savedMajor);
  const [year, setYear] = useState(savedYear);
  const [college, setCollege] = useState(savedCollege);
  const [majors, setMajors] = useState<{ id: string; field: string }[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState("");
const [customMajorText, setCustomMajorText] = useState(savedCustom);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
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
            user_id: userId,
            custom_major: customMajorText ? customMajorText : null, // Send custom major if provided
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        
        setMessage("Saved successfully!");
        setIsSuccess(true);
        console.log("message:", message);
        localStorage.removeItem("major_id");
        localStorage.removeItem("year_in_school");
        localStorage.removeItem("college");
        localStorage.removeItem("custom_major");

        localStorage.removeItem("dob");
        localStorage.removeItem("month");
        localStorage.removeItem("day");
        localStorage.removeItem("year");
        localStorage.removeItem("selectedGender");
    
        // ✅ Navigate AFTER success
        navigate("/dashboard");
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

       <div className="center-section">
 
  <Autocomplete
    options={schoolData}
    getOptionLabel={(option) => option.name}
    value={schoolData.find((s) => s.name === college) || null}
    onChange={(event, newValue) => {
      const newCollege = newValue ? newValue.name : "";
      setCollege(newCollege);
      localStorage.setItem("college", newCollege);
    }}
    
    renderInput={(params) => (
      <TextField
        {...params}
        className='dropdown-wrapper2'
        placeholder="Search for your school..."
        variant="outlined"
        fullWidth
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px', // Makes it look like a search bar capsule
            paddingLeft: '15px',
            backgroundColor: '#ffffff',
            '& fieldset': { border: '1px solid #000000' },
            '&:hover fieldset': { borderColor: '#000000' },
            
          }
        }}
      />
    )}
  />
</div>
       

        {/* Major */}
        <div className="center-section">
            <p className="section-label">Major</p>
            <Autocomplete
            options={majors || []}
            getOptionLabel={(option) => option.field || ""}
             value={majors.find((m) => m.id === major_id) || null}
             onChange={(event, newValue) => {const newId = newValue ? newValue.id : "";
              setMajorid(newId);
              localStorage.setItem("major_id", newId);

              
              // Clear text if they change from "Other" to a predefined major
              if (newId !== "22") setCustomMajorText("");
              localStorage.setItem("custom_major", ""); 
             }}
             renderInput={(params) => (         
             <TextField
             {...params}
             className="dropdown-wrapper"  // 👈 reuse your CSS class
             placeholder="Select Major"
             variant="outlined"
             fullWidth/>)}/>

              {Number(major_id) === 22 && (
    <div className="custom-major-input">
      <TextField
        label="Please type your major"
        placeholder="e.g. Music"
       sx={{
    // 1. Style the label when it's just sitting there (Normal)
    '& .MuiInputLabel-root': {
      color: '#010101', 
      fontSize: '10px',
      textAlign: 'center',
      transformOrigin: 'center',
    },
    // 2. Style the label when it's "shrunk" (Floating at the top)
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#1f2022', // Changes color when you click in
      fontWeight: 'bold',
    },
    // 3. Style the label specifically when it's shrunk (even if not focused)
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)', // Default MUI position
      letterSpacing: '1px',
    }
  }}
        value={customMajorText}
        onChange={(e) => {
          setCustomMajorText(e.target.value);
          localStorage.setItem("custom_major", e.target.value);
        }}
        fullWidth
        style={{ marginTop: '15px' }} // Adds a little breathing room
        variant="outlined"
      />
    </div>)}

            
</div>

        {/* Year */}
        {/* Year */}
<div className="center-section">
  <p className="section-label">Year</p>
  <Autocomplete
    options={years} // Using your ["Freshman", "Sophomore", ...] array
    value={year || null}
    onChange={(event, newValue) => {
      setYear(newValue || "");
      localStorage.setItem("year_in_school", newValue || "");
    }}
    // This makes it act like a "Select" but with the Searcher style
    disableClearable={false} 
    renderInput={(params) => (
      <TextField
        {...params}
        className='dropdown-wrapper'  // Reuse your existing CSS for consistent styling 
        placeholder="Select your year"
        variant="outlined"
        fullWidth
        sx={{
    // 1. Style the label when it's just sitting there (Normal)
    '& .MuiInputLabel-root': {
      color: '#010101', 
      fontSize: '10px',
      textAlign: 'center',
      transformOrigin: 'center',
    },
    // 2. Style the label when it's "shrunk" (Floating at the top)
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#1f2022', // Changes color when you click in
      fontWeight: 'bold',
    },
    
  }}
        
      />
    )}
  />
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
              Get To Dashing
            </button>
          </div>

          
        </div>

        {message && <p>{message}</p>}

      </div>
    </form>
  );
}

