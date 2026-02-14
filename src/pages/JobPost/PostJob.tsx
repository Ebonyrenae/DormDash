import React, { ReactNode, CSSProperties } from "react";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoMenuOutline,
  IoCalendarOutline,
} from "react-icons/io5";

export default function JobBoard(): ReactNode {
  const labelStyle: CSSProperties = {
    textAlign: "left",
    fontSize: "16px", // Increased from 14px
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: "10px",
    display: "block"
  };

  const inputStyle = {
    borderColor: "#d1d5dc",
    borderRadius: "10px", // More rounded
    borderWidth: "2px", // Slightly thicker border
    borderStyle: "solid",
    width: "100%",
    height: "50px", // Increased from 40px
    padding: "0 18px",
    fontSize: "16px", // Larger text input
    outline: "none",
    marginBottom: "30px", // More space between fields
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#fff"
  };

  const categoryBtnStyle = {
    width: "110px", // Increased from 90px
    height: "85px", // Increased from 70px
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderRadius: "12px",
    borderStyle: "solid",
    borderColor: "#d1d5dc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  return (
    <div style={{ paddingBottom: "80px", fontFamily: "'Inter', sans-serif", backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <style>
        {`
          input::placeholder, textarea::placeholder {
            color: #adb5bd;
            font-size: 14px;
          }
          .category-btn:hover {
            border-color: #29AC3D !important;
            background-color: #f0fff4;
            transform: translateY(-2px);
          }
          .category-btn:active {
            transform: translateY(0);
          }
        `}
      </style>

      {/* Header Area */}
      <div style={{ padding: "20px 30px" }}>
        <IoMenuOutline style={{ fontSize: 45, cursor: "pointer", color: "#333" }} />
      </div>

      <h1 style={{ textAlign: "center", color: "#29AC3D", fontWeight: "800", margin: "10px 0 8px 0", fontSize: "36px" }}>
        Post A Job
      </h1>
      <p style={{ textAlign: "center", color: "#636e72", fontSize: "16px", marginBottom: "40px" }}>
        Fill in the details below to post your job
      </p>

      <hr style={{ border: "none", height: "1px", backgroundColor: "#dfe6e9", width: "100%", marginBottom: "50px" }} />

      {/* Main Form Container */}
      <div style={{ maxWidth: "950px", margin: "0 auto", padding: "0 25px" }}>
        
        {/* SERVICE TYPE SECTION */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <label style={labelStyle}>Service type</label>
            <span style={{ color: "#86a94e", fontSize: "13px", fontWeight: "500" }}>(choose a category)</span>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {[
              { ico: "🚘", label: "Rides" },
              { ico: "🛒", label: "Groceries" },
              { ico: "🧼", label: "Cleaning" },
              { ico: "📚", label: "Tutoring" },
              { ico: "👨‍🔧", label: "Handyman" },
              { ico: "👨‍🍳", label: "Cooking" },
              { ico: "🚚", label: "Moving" },
              { ico: "➕", label: "Other" },
            ].map((item, idx) => (
              <button key={idx} className="category-btn" style={categoryBtnStyle}>
                <span style={{ fontSize: "30px" }}>{item.ico}</span>
                <span style={{ fontSize: "13px", marginTop: "8px", fontWeight: "600" }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* JOB TITLE */}
        <label style={labelStyle}>Job Title</label>
        <input style={inputStyle} placeholder="e.g. Help moving boxes to 3rd floor" />

        {/* DATE AND TIME */}
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "280px" }}>
            <label style={labelStyle}>Date</label>
            <div style={{ position: "relative" }}>
              <IoCalendarOutline style={{ position: "absolute", left: "15px", top: "16px", fontSize: "20px", color: "#636e72" }} />
              <input style={{ ...inputStyle, paddingLeft: "45px" }} placeholder="mm/dd/yyyy" />
            </div>
          </div>
          <div style={{ flex: "1", minWidth: "280px" }}>
            <label style={labelStyle}>Time</label>
            <div style={{ position: "relative" }}>
              <IoTimeOutline style={{ position: "absolute", left: "15px", top: "16px", fontSize: "20px", color: "#636e72" }} />
              <input style={{ ...inputStyle, paddingLeft: "45px" }} placeholder="00:00 AM/PM" />
            </div>
          </div>
        </div>

        {/* BUDGET & LOCATION */}
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "280px" }}>
            <label style={labelStyle}>Budget ($)</label>
            <input style={inputStyle} placeholder="Enter your Budget" type="number" />
          </div>
          <div style={{ flex: "1", minWidth: "280px" }}>
            <label style={labelStyle}>Location</label>
            <div style={{ position: "relative" }}>
              <IoLocationOutline style={{ position: "absolute", left: "15px", top: "16px", fontSize: "20px", color: "#636e72" }} />
              <input style={{ ...inputStyle, paddingLeft: "45px" }} placeholder="Enter Location" />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <label style={labelStyle}>Description</label>
        <textarea 
          style={{ ...inputStyle, height: "160px", paddingTop: "15px", maxWidth: "100%", resize: "vertical" }} 
          placeholder="Describe the details of what you need done..."
        />

        {/* ACTIONS */}
        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <button style={{
            width: "100%",
            maxWidth: "600px",
            height: "60px",
            backgroundColor: "#29AC3D",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0px 6px 15px rgba(41, 172, 61, 0.3)",
            transition: "background 0.2s"
          }}>
            POST JOB
          </button>
          
          <button style={{
            width: "100%",
            maxWidth: "600px",
            height: "60px",
            backgroundColor: "#fff",
            border: "2px solid #fab1a0",
            borderRadius: "12px",
            color: "#d63031",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}