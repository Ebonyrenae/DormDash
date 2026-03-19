import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./jobdetails.css";

const API_BASE_URL = "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

type BackendJob = {
  id: number;
  service_type: string;
  title: string;
  description: string | null;
  budget: string;
  location: string;
  job_date: string;
  job_time: string;
  user_id: number;
  username: string | null;
  created_at: string;
};

type BackendUser ={
  id: number;
  username: string;
  email: string;
  profile_picture: string | null;};

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<BackendJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<BackendUser | null>(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const loggedInUserId = Number(localStorage.getItem("userId"))



  const handleAcceptJob = async () => {
    if (!job) return;
    try {
        const res = await fetch(`${API_BASE_URL}/accept_job.php`, {
            method: "POST",           // POST because we're sending data
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_id: job.id,        // send the job id to the backend
                accepted_by: loggedInUserId  // send the user id of the person accepting the job
            })
        });

        const data = await res.json();

        if (data.success) {
            console.log("Job accepted!")
        } else {
            console.log("Failed to accept job")
        }

    } catch {
        console.log("Network error")
    }
}

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get_all_jobs.php`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Job not found");
          return;
        }

        const foundJob = data.jobs.find(
          (j: BackendJob) => j.id === Number(jobId)
        );

        if (!foundJob) {
          setError("Job not found");
          return;
        }

        setJob(foundJob);

      } catch {
        setError("Network error loading job.");
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="job-details-page">

      {/* Back button */}
      <button className="back-button" onClick={() => navigate("/all-jobs")}>
        ← Back to Jobs
      </button>

      <div className="floating-box">

        {/* Top row - badge and price */}
        <div className="top-row">
          <div className="service-type-display">
            <p className="service-type">{job.service_type}</p>
          </div>
          <span style={{ fontSize: 22, fontFamily: "Inter", fontWeight: 500 }}>
            ${job.budget}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 22, fontFamily: "Inter", fontWeight: 500, marginBottom: 0 }}>
          {job.title}
        </h1>

        {/* Posted by */}
        <p
          onClick={() => navigate(`/profile/${job.user_id}`)}
          className="posted-by"
        >
          Posted by: @{job.username ?? "User"}
        </p>

        <hr className="divider" />

        {/* Description */}
        <p style={{ fontSize: 14, fontFamily: "Inter", marginBottom: 30, fontWeight: 400 }}>
          {job.description ?? "No description provided"}
        </p>

        {/* Info boxes */}
        <div className="box-column">

          {/* Row 1 - Location and Time */}
          <div className="box-row">
            <div className="boxes">
              <div style={{ flexDirection: "column", display: "flex" }}>
                <p style={{ fontSize: 12, fontFamily: "Inter", color: "grey", fontWeight: 500 }}>Location</p>
                <p style={{ fontSize: 14, fontFamily: "Inter" }}>📍 {job.location}</p>
              </div>
            </div>

            <div className="boxes">
              <div style={{ flexDirection: "column", display: "flex" }}>
                <p style={{ fontSize: 12, fontFamily: "Inter", color: "grey", fontWeight: 500 }}>Time</p>
                <p style={{ fontSize: 14, fontFamily: "Inter" }}>🕐 {job.job_time?.slice(0, 5)}</p>
              </div>
            </div>
          </div>

          {/* Row 2 - Date and Posted */}
          <div className="box-row">
            <div className="boxes">
              <div style={{ flexDirection: "column", display: "flex" }}>
                <p style={{ fontSize: 12, fontFamily: "Inter", color: "grey", fontWeight: 500 }}>Date</p>
                <p style={{ fontSize: 14, fontFamily: "Inter" }}>📅 {job.job_date}</p>
              </div>
            </div>

            <div className="boxes">
              <div style={{ flexDirection: "column", display: "flex" }}>
                <p style={{ fontSize: 12, fontFamily: "Inter", color: "grey", fontWeight: 500 }}>Posted</p>
                <p style={{ fontSize: 14, fontFamily: "Inter" }}>{job.created_at?.slice(0, 10)}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Buttons */}
       

        
      {job.user_id !== loggedInUserId ? (
    <>
        <button className="negotiate-btn">
            Negotiate Price with {job.username ?? "User"}
        </button>
        <button className="accept-button" onClick={handleAcceptJob}>
            Accept Job
        </button>
    </>
) : (
    <p style={{ textAlign: "center", color: "grey", fontSize: 14, fontFamily: "Inter", marginTop: 20 }}>
    This is your job posting.{" "}
    <span 
        onClick={() => navigate("/my-requests")}
        style={{ color: "#29ac3d", cursor: "pointer" }}
    >
        Manage your posting from your My Request Page
    </span>
</p>
)}

      </div>
    </div>
  );
};

export default JobDetails;