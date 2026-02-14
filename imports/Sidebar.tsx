import React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    onClose(); // close sidebar after clicking
  };

  return (
    <>
      {/* Dark overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: 200,
          background: "white",
          boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
          transform: isOpen ? "translateX(0)" : "translateX(-110%)",
          transition: "transform 200ms ease",
          zIndex: 1000,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <strong>Menu</strong>
          <button onClick={onClose} style={{ cursor: "pointer", border: "none", background: "transparent", fontSize: 20 }}>
            ✕
          </button>
        </div>

        <button onClick={() => go("/")} style={btnStyle}>Home</button>
       <button onClick={() => alert("View Jobs clicked!")} style={btnStyle}>View Jobs</button> 
        <button onClick={() => alert("Post a Job clicked!")} style={btnStyle}>Post a Job</button>
        <button onClick={() => alert("My Requests clicked!")} style={btnStyle}>My Requests</button>
        <button onClick={() => alert("Profile clicked!")} style={btnStyle}>Profile</button> 
        <button onClick={() => alert("Messages clicked!")} style={btnStyle}>Messages</button>
        <button onClick={() => alert("Settings clicked!")} style={btnStyle}>Settings</button>

        {/* For your professor’s “pretend error” requirement */}
      </div>
    </>
  );
}

const btnStyle = {
  display: "flex",
  width: "100%",
  textAlign: "left" as const,
  fontSize: "12px",
  fontWeight: "bold",
  padding: "10px 12px",
  borderRadius: 10,
  border: "none",
  background: "transparent",
  cursor: "pointer",
};