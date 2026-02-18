import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiEdit3 } from "react-icons/fi";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null); // Track fetch errors

  useEffect(() => {
    fetch(
      "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/get_profile.php"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Debug log
        setProfile(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error loading profile: {error}</div>;
  if (!profile) return <div>Loading profile...</div>; // still waiting

  // Make sure destructuring is safe
  const accountInfo = profile.accountInfo || {};
  const reviews = profile.reviews || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white" }}>
      {/* Header Section */}
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#D3EFA8",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            flexDirection: "row",
            top: "20px",
            left: "15px",
            gap: "1340px",
            display: "flex",
          }}
        >
          <RxHamburgerMenu style={{ color: "black", fontSize: "25px" }} />
          <FiEdit3 style={{ color: "black", fontSize: "20px" }} />
        </div>

        {/* Profile Picture */}
        <div
          style={{
            width: "180px",
            height: "180px",
            backgroundColor: "grey",
            borderRadius: "50%",
            marginTop: "160px",
            border: "3px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={accountInfo.profile_picture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>
      </div>

      {/* Name and Basic Info */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3 style={{ marginTop: "80px", textAlign: "center", fontSize: "24px" }}>
          {accountInfo["first name"]} {accountInfo["last name"]}
        </h3>

        <div
          style={{
            width: "65%",
            height: "150%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
          }}
        >
          <div style={{ fontSize: "14px", color: "#6A7282", flexDirection: "column" }}>
            <p style={{ fontWeight: "bold" }}>{accountInfo.college}</p>
            <p style={{ fontWeight: "bold" }}>
              {accountInfo.major}, {accountInfo.year_in_school}
            </p>
            <p style={{ fontSize: "12px" }}>Member since Feb 2025</p>
            <p style={{ fontSize: "12px" }}>
              {accountInfo.total_jobs_completed} Jobs Completed
            </p>
            <p style={{ fontSize: "10px" }}>⭐ {accountInfo.rating}</p>
          </div>
        </div>
      </div>

      {/* Bio and Experience */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "400px",
          marginTop: "20px",
        }}
      >
        {/* Bio */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "black", marginRight: "300px", fontSize: "24px" }}>Bio</h3>
          <p
            style={{
              color: "black",
              fontSize: "16px",
              marginLeft: "140px",
              marginTop: "0px",
            }}
          >
            {accountInfo.bio}
          </p>
        </div>

        {/* Experience */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "black", fontSize: "24px" }}>Experience</h3>
          <p
            style={{
              color: "black",
              fontSize: "16px",
              marginLeft: "150px",
              marginTop: "0px",
            }}
          >
            {accountInfo.Experience}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "20px",
        }}
      >
        <h3 style={{ color: "black", marginBottom: "10px", fontSize: "24px" }}>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} style={{ marginTop: "5px" }}>
              <p style={{ color: "black", fontSize: "16px" }}>
                ⭐ {review.rating} - {review.reviewer_first_name} {review.reviewer_last_name}
              </p>
              <p style={{ color: "black", fontSize: "16px", marginLeft: "10px" }}>
                "{review.review_text}"
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
