import React from "react";
import { useState } from "react";
import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./yourjobs.css";

type StatusType = "Active" | "In Progress" | "Completed";

interface Request {
  id: string;
  category: string;
  categoryEmoji: string;
  status: StatusType;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  budget: string;
}

const API_BASE_URL =
  "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

type BackendJob = {
  id: number;
  service_type: string;
  title: string;
  description: string | null;
  budget: string;
  location: string;
  job_date: string;
  job_time: string;
  status: string;
};

const SERVICE_EMOJI: Record<string, string> = {
  rides: "🚗",
  groceries: "🛒",
  cleaning: "🧼",
  tutoring: "📚",
  handyman: "🧑‍🔧",
  cooking: "👨‍🍳",
  moving: "🚛",
};

// converts backend status to frontend StatusType
function toStatusLabel(status: string): StatusType {
  if (status === "in_progress") return "In Progress";
  if (status === "completed") return "Completed";
  return "Active";
}

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
];

const statusClass: Record<StatusType, string> = {
  Active: "status-active",
  "In Progress": "status-in-progress",
  Completed: "status-completed",
};

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type FilterTab = "All" | StatusType;

const YourJobs = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  // confirmation code modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // fetch accepted jobs from backend
  useEffect(() => {
    (async () => {
      try {
        setLoadError(null);
        const userId = localStorage.getItem("userId")
        const res = await fetch(`${API_BASE_URL}/get_accepted_jobs.php?user_id=${userId}`, {
             method: "GET",
             credentials: "include",
            });
        const data = await res.json();

        if (!data.success) {
          setLoadError(data.message || "Failed to load your jobs.");
          return;
        }

        const mapped: Request[] = (data.jobs as BackendJob[]).map((j) => {
          const time = j.job_time?.slice(0, 5);
          const dateTime = `${j.job_date}\n${time}`;
          return {
            id: String(j.id),
            category: j.service_type?.charAt(0).toUpperCase() + j.service_type?.slice(1),
            categoryEmoji: SERVICE_EMOJI[j.service_type] ?? "🧾",
            status: toStatusLabel(j.status),  // maps backend status to frontend
            title: j.title,
            description: j.description ?? "",
            dateTime,
            location: j.location,
            budget: j.budget,
          };
        });

        setRequests(mapped);
      } catch {
        setLoadError("Network error loading your jobs.");
      }
    })();
  }, []);

  // mark job as complete
  const handleMarkComplete = async (jobId: string, code: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/update_job_status.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          status: "completed",
          confirmation_code: code,
          user_id: localStorage.getItem("userId"),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        // wrong confirmation code or other error
        setConfirmError(data.message || "Invalid confirmation code");
        return;
      }

      // update the card status locally without refetching
      setRequests((prev) =>
        prev.map((r) =>
          r.id === jobId ? { ...r, status: "Completed" as StatusType } : r
        )
      );

      // close the modal
      setShowConfirmModal(false);
      setConfirmCode("");
      setConfirmError("");
      setSelectedJobId(null);

    } catch {
      setConfirmError("Network error. Please try again.");
    }
  };

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const activeCount = requests.filter((r) => r.status === "Active").length;
  const inProgressCount = requests.filter((r) => r.status === "In Progress").length;
  const completedCount = requests.filter((r) => r.status === "Completed").length;

  const filtered =
    activeFilter === "All"
      ? requests
      : requests.filter((r) => r.status === activeFilter);

  return (
    <div className="requests-page">

      {/* Confirmation Code Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ fontFamily: "Inter", fontWeight: 500, marginBottom: 8 }}>
              Enter Confirmation Code
            </h3>
            <p style={{ fontSize: 13, color: "grey", fontFamily: "Inter", marginBottom: 16 }}>
              Enter the code provided by the job poster to confirm completion
            </p>
            <input
              type="text"
              className="confirm-input"
              placeholder="Enter code..."
              value={confirmCode}
              onChange={(e) => {
                setConfirmCode(e.target.value);
                setConfirmError("");
              }}
            />
            {confirmError && (
              <p style={{ color: "red", fontSize: 12, marginTop: 6, fontFamily: "Inter" }}>
                {confirmError}
              </p>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmCode("");
                  setConfirmError("");
                  setSelectedJobId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="modal-confirm-btn"
                onClick={() => {
                  if (selectedJobId) {
                    handleMarkComplete(selectedJobId, confirmCode);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`sidebar-drawer${sidebarOpen ? " open" : ""}`}
        aria-label="Navigation menu"
      >
        <nav className="sidebar-nav">
          {SIDEBAR_LINKS.map((link) => (
            <button
              key={link.path}
              className={`sidebar-link${location.pathname === link.path ? " active" : ""}`}
              onClick={() => handleSidebarLink(link.path)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Header */}
      <header className="requests-header">
        <div className="requests-header-inner">
          <button
            className="requests-menu-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <h1 className="requests-page-title">Your Jobs</h1>
        </div>
        <hr className="requests-header-divider" />
      </header>

      {/* Main */}
      <main className="requests-main">

        {/* Stats */}
        <div className="requests-stats-row">
          <div
            className={`stat-card${activeFilter === "Active" || activeFilter === "All" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter(activeFilter === "Active" ? "All" : "Active")}
            role="button"
            tabIndex={0}
          >
            <div className="stat-card-number color-green">{activeCount}</div>
            <div className="stat-card-label">Active</div>
          </div>

          <div
            className={`stat-card${activeFilter === "In Progress" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter(activeFilter === "In Progress" ? "All" : "In Progress")}
            role="button"
            tabIndex={0}
          >
            <div className="stat-card-number color-orange">{inProgressCount}</div>
            <div className="stat-card-label">In Progress</div>
          </div>

          <div
            className={`stat-card${activeFilter === "Completed" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter(activeFilter === "Completed" ? "All" : "Completed")}
            role="button"
            tabIndex={0}
          >
            <div className="stat-card-number color-gray">{completedCount}</div>
            <div className="stat-card-label">Completed</div>
          </div>
        </div>

        {loadError && (
          <p style={{ color: "red", fontFamily: "Inter", fontSize: 14 }}>{loadError}</p>
        )}

        {/* Request Cards */}
        <div className="requests-list">
          {filtered.map((req) => (
            <div key={req.id} className="request-card">
              <div className="request-card-top">
                <div className="category-badge">
                  <span className="category-badge-emoji">{req.categoryEmoji}</span>
                  <span>{req.category}</span>
                </div>
                <span className={`status-badge ${statusClass[req.status]}`}>
                  {req.status}
                </span>
              </div>

              <h3 className="request-card-title">{req.title}</h3>
              <p className="request-card-description">{req.description}</p>

              <div className="request-card-meta">
                <div className="request-meta-item">
                  <span className="request-meta-key"><ClockIcon /> Date &amp; Time</span>
                  <span className="request-meta-value" style={{ whiteSpace: "pre-line" }}>
                    {req.dateTime}
                  </span>
                </div>
                <div className="request-meta-item">
                  <span className="request-meta-key"><LocationIcon /> Location</span>
                  <span className="request-meta-value">{req.location}</span>
                </div>
                <div className="request-meta-item">
                  <span className="request-meta-key"><DollarIcon /> Budget</span>
                  <span className="request-meta-value budget-value">{req.budget}</span>
                </div>
              </div>

              {/* show button only for in progress jobs */}
              {req.status === "In Progress" && (
                <button
                  className="complete-btn"
                  onClick={() => {
                    setSelectedJobId(req.id);
                    setShowConfirmModal(true);
                  }}
                >
                  Enter Confirmation Code
                </button>
              )}

            </div>
          ))}

          {filtered.length === 0 && (
            <p style={{ fontFamily: "Inter", fontSize: 14, color: "grey", textAlign: "center", marginTop: 40 }}>
              No jobs found
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default YourJobs;