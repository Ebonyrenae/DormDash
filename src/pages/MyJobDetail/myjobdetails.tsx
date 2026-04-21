import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./myjobdetails.css";
import { trackJobActivity, trackViewedJob } from "../../utils/recentActivities";

const API_BASE_URL = "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

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
  confirmation_code?: string | null;
  completion_code?: string | null;
  status?: string;
  phone?: string;
};

type BackendUser ={
  id: number;
  username: string;
  email: string;
  profile_picture: string | null;};

type JobRouteState = {
  fromPath?: string;
  recentAvailability?: "available" | "picked_by_other";
  recentActivity?: {
    title: string;
    budget?: string;
    location?: string;
    category?: string;
    eventType?: "viewed_job" | "accepted_job";
    status?: string;
  };
};

type CtaState = "available" | "picked_by_other" | "picked_by_you" | "your_post";
type statusType = "pending" | "accepted" | "completed" | "cancelled";


const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState<BackendJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loggedInUserId = Number(
    localStorage.getItem("userId") || localStorage.getItem("user_id") || 0
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const routeState = (location.state as JobRouteState | null) ?? null;
  const fromPath = routeState?.fromPath;
  const recentAvailability = (
    location.state as { recentAvailability?: "available" | "picked_by_other" } | null
  )?.recentAvailability;
  const backPath = fromPath === "/dashboard" || fromPath === "/recent-activities"
    ? fromPath
    : "/all-jobs";

  const findById = (items: BackendJob[] | undefined, id: number): BackendJob | null => {
    if (!Array.isArray(items)) return null;
    return items.find((j) => j.id === id) ?? null;
  };

  const [ctaState, setCtaState] = useState<CtaState>("available");



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
            trackJobActivity({
              jobId: String(job.id),
              title: job.title,
              eventType: "accepted_job",
              budget: job.budget,
              location: job.location,
              category: job.service_type,

              
            });
            setIsSuccess(true);
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
      const targetJobId = Number(jobId);
      let foundJob: BackendJob | null = null;
      let foundSource: "all" | "accepted" | "my" | "fallback" = "fallback";

      if (loggedInUserId) {
  // Try get_accepted_jobs FIRST so phone number is available
  try {
    const acceptedRes = await fetch(
      `${API_BASE_URL}/get_accepted_jobs.php?user_id=${loggedInUserId}&t=${Date.now()}`,
      { credentials: "include" }
    );
    const acceptedData = await acceptedRes.json();
    if (acceptedData.success) {
      foundJob = findById(acceptedData.jobs, targetJobId);
      if (foundJob) foundSource = "accepted";
    }
  } catch {
    console.warn("get_accepted_jobs failed, trying next source");
  }

  // Then try get_my_jobs
  if (!foundJob) {
    try {
      const myJobsRes = await fetch(`${API_BASE_URL}/get_my_jobs.php`, {
        credentials: "include",
      });
      const myJobsData = await myJobsRes.json();
      if (myJobsData.success) {
        foundJob = findById(myJobsData.jobs, targetJobId);
        if (foundJob) foundSource = "my";
      }
    } catch {
      console.warn("get_my_jobs failed, trying next source");
    }
  }
}

      // Try get_all_jobs
      if (!foundJob) {
        try {
          const allJobsRes = await fetch(`${API_BASE_URL}/get_all_jobs.php`, {
            credentials: "include",
          });
          const allJobsData = await allJobsRes.json();
          if (allJobsData.success) {
            foundJob = findById(allJobsData.jobs, targetJobId);
            if (foundJob) foundSource = "all";
          }
        } catch {
          console.warn("get_all_jobs failed");
        }
      }

      if (!foundJob) {
        if (routeState?.recentActivity) {
          foundJob = {
            id: targetJobId,
            service_type: routeState.recentActivity.category ?? "Other",
            title: routeState.recentActivity.title,
            description: "This job is no longer available in the active feed.",
            budget: routeState.recentActivity.budget ?? "",
            location: routeState.recentActivity.location ?? "",
            job_date: "",
            job_time: "",
            user_id: 0,
            username: "User",
            created_at: "",
            status: "active",
          };
          foundSource = "fallback";
        } else {
          setError("Job not found");
          return;
        }
      }

      setJob(foundJob);

      // ... inside your useEffect, after setJob(foundJob) ...

// Use a local variable to determine the state immediately for logging/tracking
// ... inside your useEffect ...

let nextCtaState: CtaState = "available";

// 1. Check if it's an accepted job FIRST
if (foundSource === "accepted" || routeState?.recentActivity?.eventType === "accepted_job") {
    nextCtaState = "picked_by_you";
} 
// 2. Then check if it's your own post
else if (foundSource === "my" || foundJob.user_id === loggedInUserId) {
    nextCtaState = "your_post";
} 
// 3. Then check if someone else got it
else if (recentAvailability === "picked_by_other" || (foundJob.status !== "pending" && foundJob.status !== "active")) {
    nextCtaState = "picked_by_other";
} 
else {
    nextCtaState = "available";
}

setCtaState(nextCtaState);

// Log the LOCAL variable (nextCtaState) so you see the REAL value immediately
console.log("Source:", foundSource, "Determined CTA:", nextCtaState, "Phone:", foundJob.phone);

trackViewedJob({
    jobId: String(foundJob.id),
    title: foundJob.title,
    budget: foundJob.budget,
    location: foundJob.location,
    category: foundJob.service_type,
});

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
        <>
            {/* 1. The Success Overlay (Conditional) */}
    {isSuccess && (
      <div className="success-screen">
        <div className="success-card">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
          <h2 className="success-title">Job Accepted!</h2>
          <p className="success-text">The poster has been notified. You can now track this job on the Your Jobs Page.</p>
          <div className="success-buttons">
              <button className="primary-btn" onClick={() => navigate("/Your-Jobs")}>Go to Your Jobs</button>
              <button className="secondary-btn" onClick={() => navigate("/all-jobs")}>Back to Feed</button>
          </div>
        </div>
      </div>
    )}
        
        <div className="job-details-page">
        <div className="content-wrapper">

        {/* Back button */}
        <button className="back-button" onClick={() => navigate(fromPath || "/your-jobs")}>
            {fromPath === "/your-jobs" ? "← Back to Your Jobs" : "← Back"}
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

  {/* Phone number - only shown to dasher who accepted */}
  {ctaState === "picked_by_you" && job.phone && (
    <div className="box-row">
      <div className="boxes" style={{ width: "100%" }}>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <p style={{ fontSize: 12, fontFamily: "Inter", color: "grey", fontWeight: 500 }}>
            Poster Contact
          </p>
          <p style={{ fontSize: 14, fontFamily: "Inter" }}>
            {"📞 "}
            <a href={"tel:" + job.phone} style={{ color: "#29ac3d", textDecoration: "none" }}>
              {job.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  )}

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

            {(job.status === "active" || job.status === "in_progress") && (
              <div style = {{ fontFamily: "Inter", marginTop: 24,
                    padding: "16px 20px",
                    backgroundColor: "#f9fafb",
                    borderRadius: 12,
                    border: "1px dashed #d1d5db",
                    }} className="job-codes">

            <p>
              <strong style={{fontFamily: "Inter", marginTop: 20, color: "green" }}>Meet-up Code: </strong>{job.confirmation_code ?? "Not available"}
              <p style={{ fontSize: 12, fontFamily: "Inter", color: "grey", marginTop: 4 }}>
                Show this code to your client to verify you're meeting the right person </p>
            </p>

                </div>
)}
            
        {ctaState === "your_post" ? (
        <p style={{ textAlign: "center", color: "grey", fontSize: 14, fontFamily: "Inter", marginTop: 20 }}>
        This is your job posting.{" "}
        <span 
            onClick={() => navigate("/my-requests")}
            style={{ color: "#29ac3d", cursor: "pointer" }}
        >
            Manage your posting from your My Request Page
        </span>
    </p>
    ) : ctaState === "available" ? (
      <>
        <button className="negotiate-btn">
            Negotiate Price with {job.username ?? "User"}
        </button>
        <button className="accept-button" onClick={handleAcceptJob}>
            Accept Job
        </button>
      </>
    ) : ctaState === "picked_by_you" ? (
      job.user_id > 0 ? (
        <button
          className="accept-button"
          onClick={() => navigate(`/messages/${job.user_id}`)}
        >
          Message Poster
        </button>
      ) : (
        <p className="job-unavailable-note">Open Your Jobs to message the poster</p>
      )
    ) : (
      <p className="job-unavailable-note">Someone else picked this one up</p>
    )}

        </div>
    </div>
    </div>
    </>
  );
};

export default JobDetails;