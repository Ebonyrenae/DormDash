import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoMenuOutline,
  IoCalendarOutline,
  IoLogoUsd,
} from "react-icons/io5";

export default function MyRequests() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const statButtonStyle = {
    width: 180, // Increased size
    height: 90,
    backgroundColor: "white",
    borderWidth: "2px",
    borderRadius: "12px",
    borderStyle: "solid",
    borderColor: "#d1d5dc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.2s"
  };

  const cardStyle = {
    width: "700px", // Scaled up from 500px
    minHeight: "260px",
    borderRadius: "15px",
    backgroundColor: "white",
    borderColor: "#d1d5dc",
    borderWidth: "2px",
    marginBottom: "30px",
    borderStyle: "solid",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)"
  };

  const iconCircleStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginRight: "12px"
  };

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <div style={{ padding: "20px 30px" }}>
        <button onClick={() => setSidebarOpen(true)} style={{ cursor: "pointer", border: "none", background: "transparent" }}>
          <IoMenuOutline style={{ fontSize: 40, cursor: "pointer" }} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <h1 style={{
        textAlign: "center",
        color: "#29AC3D",
        fontWeight: "800",
        marginBottom: "30px",
        fontSize: "32px"
      }}>
        My Requests
      </h1>

      <hr style={{
        border: "none",
        height: "1px",
        backgroundColor: "#dfe6e9",
        width: "100%",
        marginBottom: "40px"
      }} />

      {/* STATS SECTION */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "50px" }}>
        <button style={statButtonStyle}>
          <span style={{ fontSize: "28px", fontWeight: "bold", color: "#29AC3D" }}>2</span>
          <span style={{ fontSize: "12px", color: "#636e72", fontWeight: "600" }}>Active Requests</span>
        </button>

        <button style={statButtonStyle}>
          <span style={{ fontSize: "28px", fontWeight: "bold", color: "#d97706" }}>1</span>
          <span style={{ fontSize: "12px", color: "#636e72", fontWeight: "600" }}>In Progress</span>
        </button>

        <button style={statButtonStyle}>
          <span style={{ fontSize: "28px", fontWeight: "bold", color: "#6b7280" }}>1</span>
          <span style={{ fontSize: "12px", color: "#636e72", fontWeight: "600" }}>Completed</span>
        </button>
      </div>

      {/* REQUESTS LIST */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* CARD 1: RIDE */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1.5px solid #16a34a",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ fontSize: "20px" }}>🚘</span>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>Ride</span>
            </div>
            <div style={{ backgroundColor: "#e6f9f0", padding: "6px 16px", borderRadius: "20px" }}>
              <span style={{ fontSize: "13px", color: "#29ac3d", fontWeight: "bold" }}>Active</span>
            </div>
          </div>

          <h2 style={{ fontSize: "20px", margin: "0 0 8px 0", fontWeight: "700" }}>Ride to Airport</h2>
          <p style={{ fontSize: "15px", color: "#636e72", margin: "0 0 25px 0" }}>
            I need a ride to the airport for spring break
          </p>

          <div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
            {/* Date Info */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={iconCircleStyle}><IoCalendarOutline style={{ color: "#29ac3d", fontSize: "18px" }} /></div>
              <div>
                <div style={{ fontSize: "11px", color: "#b2bec3", textTransform: "uppercase", fontWeight: "bold" }}>Date & Time</div>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>Feb 14, 2026 • 14:30</div>
              </div>
            </div>

            {/* Location Info */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={iconCircleStyle}><IoLocationOutline style={{ color: "#29ac3d", fontSize: "18px" }} /></div>
              <div>
                <div style={{ fontSize: "11px", color: "#b2bec3", textTransform: "uppercase", fontWeight: "bold" }}>Location</div>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>Hadley Village → Airport</div>
              </div>
            </div>

            {/* Budget Info */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={iconCircleStyle}><IoLogoUsd style={{ color: "#29ac3d", fontSize: "18px" }} /></div>
              <div>
                <div style={{ fontSize: "11px", color: "#b2bec3", textTransform: "uppercase", fontWeight: "bold" }}>Budget</div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#29ac3d" }}>$25</div>
              </div>
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "#eee", margin: "10px 0 20px 0" }}></div>

          <button style={{
            alignSelf: "flex-end",
            backgroundColor: "#29ac3d",
            color: "white",
            border: "none",
            padding: "10px 25px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            View Details
          </button>
        </div>

        {/* CARD 2: CLEANING */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1.5px solid #16a34a",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ fontSize: "20px" }}>🧼</span>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>Cleaning</span>
            </div>
            <div style={{ backgroundColor: "#e6f9f0", padding: "6px 16px", borderRadius: "20px" }}>
              <span style={{ fontSize: "13px", color: "#29ac3d", fontWeight: "bold" }}>Active</span>
            </div>
          </div>

          <h2 style={{ fontSize: "20px", margin: "0 0 8px 0", fontWeight: "700" }}>Bathroom Cleaning</h2>
          <p style={{ fontSize: "15px", color: "#636e72", margin: "0 0 25px 0" }}>
            Need someone to deep clean a shared bathroom
          </p>

          <div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={iconCircleStyle}><IoCalendarOutline style={{ color: "#29ac3d", fontSize: "18px" }} /></div>
              <div>
                <div style={{ fontSize: "11px", color: "#b2bec3", textTransform: "uppercase", fontWeight: "bold" }}>Date & Time</div>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>Feb 14, 2026 • 14:30</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={iconCircleStyle}><IoLocationOutline style={{ color: "#29ac3d", fontSize: "18px" }} /></div>
              <div>
                <div style={{ fontSize: "11px", color: "#b2bec3", textTransform: "uppercase", fontWeight: "bold" }}>Location</div>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>Ellicot Complex</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={iconCircleStyle}><IoLogoUsd style={{ color: "#29ac3d", fontSize: "18px" }} /></div>
              <div>
                <div style={{ fontSize: "11px", color: "#b2bec3", textTransform: "uppercase", fontWeight: "bold" }}>Budget</div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#29ac3d" }}>$25</div>
              </div>
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "#eee", margin: "10px 0 20px 0" }}></div>

          <button style={{
            alignSelf: "flex-end",
            backgroundColor: "#29ac3d",
            color: "white",
            border: "none",
            padding: "10px 25px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            View Details
          </button>
        </div>

      </div>
    </div>
  );
}