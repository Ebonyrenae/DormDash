import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./AboutYourself.css";

export default function AboutYourself() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    // States initialized from localStorage
    const [month, setMonth] = useState(localStorage.getItem("month") || "");
    const [day, setDay] = useState(localStorage.getItem("day") || "");
    const [year, setYear] = useState(localStorage.getItem("year") || "");
    const [selectedGender, setSelectedGender] = useState(localStorage.getItem("selectedGender") || "");
    
    const [message, setMessage] = useState("");

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from({ length: 121 }, (_, i) => new Date().getFullYear() - i);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const monthIndex = months.indexOf(month) + 1;
        const formattedMonth = monthIndex.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        const formattedDOB = (month && day && year) ? `${year}-${formattedMonth}-${formattedDay}` : null;

        try {
            // Updated URL to avoid that 404 error
            const response = await fetch("https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/AdditionalInfo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    user_id: userId,
                    dob: formattedDOB, 
                    gender: selectedGender 
                })
            });

            const data = await response.json();
            if (data.success) {
                navigate("/academic-info");
            } else {
                setMessage(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <div className="onboarding-bg">
            <form className="onboarding-card" onSubmit={handleSubmit}>
                <h2 className="onboarding-title">Tell us about yourself</h2>
                {/* Adding subtitle to match the Academic page spacing */}
                <p className="onboarding-subtitle">Just a few more details to get you started</p>

                <div className="input-group">
                    <label className="input-label">What is your date of birth?</label>
                    <div className="dob-grid">
                        <div className="select-container">
                            <select value={month} onChange={(e) => {
                                setMonth(e.target.value);
                                localStorage.setItem("month", e.target.value);
                            }}>
                                <option value="" disabled>Month</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <IoMdArrowDropdown className="select-icon" />
                        </div>
                        <div className="select-container">
                            <select value={day} onChange={(e) => {
                                setDay(e.target.value);
                                localStorage.setItem("day", e.target.value);
                            }}>
                                <option value="" disabled>Day</option>
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <IoMdArrowDropdown className="select-icon" />
                        </div>
                        <div className="select-container">
                            <select value={year} onChange={(e) => {
                                setYear(e.target.value);
                                localStorage.setItem("year", e.target.value);
                            }}>
                                <option value="" disabled>Year</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <IoMdArrowDropdown className="select-icon" />
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label">How do you identify?</label>
                    <div className="gender-select-wrapper">
                        <select 
                            value={selectedGender} 
                            onChange={(e) => {
                                setSelectedGender(e.target.value);
                                localStorage.setItem("selectedGender", e.target.value);
                            }}
                            className={selectedGender ? "selected-text" : "placeholder-text"}
                        >
                            <option value="" disabled>Select a response</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Non-binary">Non-binary</option>
                        </select>
                        <IoMdArrowDropdown className="select-icon" />
                    </div>
                </div>

                <div className="onboarding-footer-stack">
                    <button type="submit" className="next-btn">Next Step</button>
                    <p className="skip-link" onClick={() => navigate("/academic-info")}>Skip for now</p>
                </div>
                
                {message && <p className="error-msg">{message}</p>}
            </form>
        </div>
    );
}