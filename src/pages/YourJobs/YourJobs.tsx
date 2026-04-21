import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
  completedAt?: string | null;
  jobDate: string;
  jobTime: string;
  wasUnassigned: boolean;
  offerStatus?: "pending" | "accepted" | "declined" | null;
  offeredPrice?: string | null;
  offerNote?: string | null;
}

const API_BASE_URL =
  "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

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
  completed_at?: string | null;
  was_unassigned: number;
  proposed_price?: string | null;
  price_note?: string | null;
  price_status?: "pending" | "accepted" | "declined" | null;
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

function toStatusLabel(status: string): StatusType {
  if (status === "in_progress") return "In Progress";
  if (status === "completed") return "Completed";
  return "Active";
}

function isJobReady(jobDate: string, jobTime: string): boolean {
  if (!jobDate || !jobTime) return true;
  const jobDateTime = new Date(`${jobDate}T${jobTime}`);
  return new Date() >= jobDateTime;
}

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Your Jobs", path: "/your-jobs" },
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

type FilterTab = "Active" | "In Progress" | "Completed";

const YourJobs = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterTab>("Active");
  const [confirmError, setConfirmError] = useState("");
  const [code, setCode] = useState<Record<string, string> | null>({});

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedRemoveJobId, setSelectedRemoveJobId] = useState<string | null>(null);

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedCompletionJobId, setSelectedCompletionJobId] = useState<string | null>(null);
  const [completionInput, setCompletionInput] = useState<string>("");
  const [completionError, setCompletionError] = useState<string>("");

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedPriceJobId, setSelectedPriceJobId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState("");
  const [note, setNote] = useState("");

  const [earlyStartIds, setEarlyStartIds] = useState<Set<string>>(new Set());

  const hasJobInProgress = requests.some((r) => r.status === "In Progress");

  const handleProposePrice = async () => {
    if (!selectedPriceJobId || !counterPrice) return;

    try {
      const res = await fetch(`${API_BASE_URL}/propose_price.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: selectedPriceJobId,
          proposed_price: counterPrice,
          price_note: note,
          user_id: localStorage.getItem("userId"),
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Update local state so UI reflects pending immediately
        setRequests((prev) =>
          prev.map((r) =>
            r.id === selectedPriceJobId
              ? { ...r, offerStatus: "pending", offeredPrice: counterPrice, offerNote: note }
              : r
          )
        );
        setShowPriceModal(false);
        setCounterPrice("");
        setNote("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadError(null);
        const userId = localStorage.getItem("userId");
        const res = await fetch(`${API_BASE_URL}/get_accepted_Jobs.php`, {
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
            status: toStatusLabel(j.status),
            title: j.title,
            description: j.description ?? "",
            dateTime,
            location: j.location,
            budget: j.budget,
            completedAt: j.completed_at ?? localStorage.getItem(`completed_at_${j.id}`),
            jobDate: j.job_date,
            jobTime: j.job_time?.slice(0, 5),
            wasUnassigned: j.was_unassigned === 1,
            offerStatus: j.price_status ?? null,
            offeredPrice: j.proposed_price ?? null,
            offerNote: j.price_note ?? null,
          };
        });

        mapped.sort((a, b) => {
          if (a.status !== "Active" || b.status !== "Active") return 0;
          const aReady = isJobReady(a.jobDate, a.jobTime);
          const bReady = isJobReady(b.jobDate, b.jobTime);
          if (aReady && !bReady) return -1;
          if (!aReady && bReady) return 1;
          return 0;
        });

        setRequests(mapped);
      } catch {
        setLoadError("Network error loading your jobs.");
      }
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDismissUnassigned = async (jobId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(`${API_BASE_URL}/dismiss_unassigned_job.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, user_id: userId }),
      });
      const data = await res.json();
      if (data?.success) {
        setRequests((prev) => prev.filter((r) => r.id !== jobId));
      } else {
        console.error("Dismiss failed", data?.message);
      }
    } catch (err) {
      console.error("Network error dismissing job", err);
    }
  };

  const handleMarkComplete = async (
    jobId: string,
    code?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const completedAt = new Date().toISOString();
      const body: Record<string, any> = {
        job_id: jobId,
        status: "completed",
        user_id: localStorage.getItem("userId"),
        completed_at: completedAt,
      };
      if (code) {
        body.completion_code = code;
      }
      const res = await fetch(`${API_BASE_URL}/update_job_status.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message || "Failed to mark job as complete" };
      }
      localStorage.setItem(`completed_at_${jobId}`, completedAt);
      setRequests((prev) =>
        prev.map((r) =>
          r.id === jobId ? { ...r, status: "Completed" as StatusType, completedAt } : r
        )
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const handleInProgress = async (jobId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/update_job_status.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          status: "in_progress",
          user_id: localStorage.getItem("userId"),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setConfirmError(data.message || "Job not moved to in progress");
        return;
      }
      setRequests((prev) =>
        prev.map((r) =>
          r.id === jobId ? { ...r, status: "In Progress" as StatusType } : r
        )
      );
      setConfirmError("");
    } catch {
      setConfirmError("Network error. Please try again.");
    }
  };

  const handlePending = async (jobId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/update_job_status.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          status: "pending",
          user_id: localStorage.getItem("userId"),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setConfirmError(data.message || "Job not removed from active jobs");
        return;
      }
      setRequests((prev) => prev.filter((r) => r.id !== jobId));
      setConfirmError("");
      setShowRemoveModal(false);
      setSelectedRemoveJobId(null);
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

  const filtered = requests.filter((r) => r.status === activeFilter);

  const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 12H5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 19L5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

  return (
    <div className="requests-page">

      {/* Price Proposal Modal */}
      {showPriceModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ fontFamily: "Inter", fontWeight: 500, marginBottom: 8 }}>
              Propose New Price
            </h3>
            <textarea
              
              placeholder="Enter Counter Price ($)"
              value={counterPrice}
              onChange={(e) => setCounterPrice(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
            />
            <textarea
              placeholder="Leave a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
              rows={3}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setShowPriceModal(false);
                  setCounterPrice("");
                  setNote("");
                }}
              >
                Cancel
              </button>
           
      
              <button
                className="modal-confirm-btn"

                onClick={() => {
                  if (!counterPrice || Number(counterPrice) <= 0) return;
                  handleProposePrice();
                }}
                style={!counterPrice || Number(counterPrice) <= 0 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                Send Counter Price
              </button> 
            </div>
          </div>
        </div>
      )}

      {/* Remove Job Confirmation Modal */}
      {showRemoveModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3 style={{ fontFamily: "Inter", fontWeight: 500, marginBottom: 8 }}>
              Remove Job
            </h3>
            <p style={{ fontSize: 14, color: "grey", fontFamily: "Inter", marginBottom: 20, lineHeight: 1.6 }}>
              Are you sure you want to remove this job from your active jobs?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setShowRemoveModal(false);
                  setSelectedRemoveJobId(null);
                  navigate("/all-jobs");
                }}
              >
                No, go to Jobs
              </button>
              <button
                className="modal-confirm-btn"
                onClick={() => {
                  if (selectedRemoveJobId) {
                    handlePending(selectedRemoveJobId);
                  }
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Code Modal */}
      {showCompletionModal && selectedCompletionJobId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Enter Completion Code</h3>
            <input
              type="text"
              value={completionInput}
              onChange={(e) => setCompletionInput(e.target.value)}
              placeholder="Enter code given by poster"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
            {(completionError || confirmError) && (
              <p style={{ color: "red" }}>{completionError || confirmError}</p>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  setSelectedCompletionJobId(null);
                  setCompletionInput("");
                  setCompletionError("");
                  setConfirmError("");
                }}
                className="modal-cancel-btn"
              >
                Cancel
              </button>
              <button
                className="modal-confirm-btn"
                onClick={async () => {
                  if (!completionInput) {
                    setCompletionError("Please enter the code.");
                    return;
                  }
                  if (!selectedCompletionJobId) {
                    setCompletionError("Job id missing.");
                    return;
                  }
                  setCompletionError("");
                  setConfirmError("");
                  const result = await handleMarkComplete(selectedCompletionJobId, completionInput);
                  if (result.success) {
                    setShowCompletionModal(false);
                    setSelectedCompletionJobId(null);
                    setCompletionInput("");
                  } else {
                    setCompletionError(result.message || "Failed to mark complete.");
                  }
                }}
              >
                Mark as Complete
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
  <div className="requests-header-left">
    <button
      className="nav-back-btn"
      onClick={() => navigate("/dashboard")}
      aria-label="Go back"
    >
      <ArrowLeftIcon />
    </button>
    <button className="requests-menu-btn" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
      <span /><span /><span />
    </button>
  </div>
  <h1 className="requests-page-title">Your Jobs</h1>
  <div className="requests-header-right" /> {/* empty spacer */}
</div>
        <hr className="requests-header-divider" />
      </header>

      {/* Main */}
      <main className="requests-main">

        {/* Stats */}
        <div className="requests-stats-row">
          <div
            className={`stat-card${activeFilter === "Active" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter("Active")}
            role="button"
            tabIndex={0}
          >
            <div className="stat-card-number color-green">{activeCount}</div>
            <div className="stat-card-label">Active</div>
          </div>

          <div
            className={`stat-card${activeFilter === "In Progress" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter("In Progress")}
            role="button"
            tabIndex={0}
          >
            <div className="stat-card-number color-orange">{inProgressCount}</div>
            <div className="stat-card-label">In Progress</div>
          </div>

          <div
            className={`stat-card${activeFilter === "Completed" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter("Completed")}
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

        {/* Job Cards */}
        <div className="requests-list">
          {filtered.map((req) => {
            const ready = isJobReady(req.jobDate, req.jobTime);
            const showEarlyMsg = earlyStartIds.has(req.id);

            return (
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

                {/* ── Active tab buttons ── */}
                {req.status === "Active" && (
                  <>
                    {req.wasUnassigned ? (
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() => handleDismissUnassigned(req.id)}
                          style={{
                            position: "absolute",
                            top: -3,
                            right: 0,
                            background: "none",
                            border: "none",
                            fontSize: 18,
                            cursor: "pointer",
                            color: "#6b7280",
                            lineHeight: 1,
                          }}
                          aria-label="Dismiss card"
                        >
                          ✕
                        </button>
                        <div style={{
                          marginTop: 12,
                          padding: "10px 14px",
                          backgroundColor: "#fef2f2",
                          borderRadius: 10,
                          border: "1px solid #fecaca",
                          fontFamily: "Inter",
                        }}>
                          <div style={{ fontSize: 14, color: "#dc2626", fontWeight: 500 }}>
                            ⚠️ You have been unassigned from this job.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
  className="postjob-btn-submit"
  style={
    !ready || hasJobInProgress
      ? { opacity: 0.5, cursor: "not-allowed" }
      : {}
  }
  onClick={() => {
    if (hasJobInProgress) {
      setEarlyStartIds((prev) => new Set(prev).add(req.id));
      return;
    }
    if (!ready) {
      setEarlyStartIds((prev) => new Set(prev).add(req.id));
      return;
    }
    handleInProgress(req.id);
  }}
>
  Start Job
</button>

{showEarlyMsg && hasJobInProgress && (
  <p style={{
    fontSize: 13,
    color: "#dc2626",
    fontFamily: "Inter",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "8px 12px",
    marginTop: 8,
  }}>
    🚫 You already have a job in progress. Complete it before starting another.
  </p>
)}

{showEarlyMsg && !ready && !hasJobInProgress && (
  <p style={{
    fontSize: 13,
    color: "#b45309",
    fontFamily: "Inter",
    backgroundColor: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 8,
    padding: "8px 12px",
    marginTop: 8,
  }}>
    ⏳ The date and time hasn't come yet for this job.
  </p>
)}

                        
                        <button
                          className="btn-view-details"
                          onClick={() => navigate(`/my-job/${req.id}`, { state: { fromYourJobsStatus: "Active" } })}
                        >
                          View Details
                        </button>

                       
                        {/* Propose New Price button — only show if no pending offer */}
                        {req.offerStatus === "pending" ? (
                          <button className="complete-btn" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                            Offer Pending...
                          </button>
                        ) : (
                          <button
                            className="complete-btn"
                            onClick={() => {
                              setSelectedPriceJobId(req.id);
                              setShowPriceModal(true);
                            }}
                          >
                            Propose New Price
                          </button>
                        )}

                        <button
                          className="complete-btn"
                          onClick={() => {
                            setSelectedRemoveJobId(req.id);
                            setShowRemoveModal(true);
                          }}
                        >
                          Remove Job From Active Jobs
                        </button>
                      </>
                    )}

                     {/* Offer status feedback to dasher */}
                        {req.offerStatus === "accepted" && (
                          <div style={{
                            marginTop: 8,
                            padding: "8px 12px",
                            backgroundColor: "#f0fdf4",
                            border: "1px solid #bbf7d0",
                            borderRadius: 8,
                            fontFamily: "Inter",
                          }}>
                            <div style={{ fontSize: 13, color: "#16a34a", fontWeight: 500 }}>
                              ✅ Your price offer was accepted! New budget: ${req.budget}
                            </div>
                          </div>
                        )}

                        {req.offerStatus === "declined" && (
                          <div style={{
                            marginTop: 8,
                            padding: "8px 12px",
                            backgroundColor: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: 8,
                            fontFamily: "Inter",
                          }}>
                            <div style={{ fontSize: 13, color: "#dc2626", fontWeight: 500 }}>
                              ❌ Your price offer was declined.
                            </div >
                          </div>
                        )}


                  </>
                )}

                {/* ── In Progress tab buttons ── */}
                {req.status === "In Progress" && (
                  <>
                    <button
                      className="btn-view-details"
                      onClick={() => navigate(`/my-job/${req.id}`, { state: { fromYourJobsStatus: "In Progress" } })}
                    >
                      View Details
                    </button>
                    <button
                      className="complete-btn"
                      onClick={() => {
                        setSelectedCompletionJobId(req.id);
                        setCompletionInput("");
                        setCompletionError("");
                        setConfirmError("");
                        setShowCompletionModal(true);
                      }}
                    >
                      Mark as Complete
                    </button>
                  </>
                )}

                {/* ── Completed tab ── */}
                {req.status === "Completed" && (
                  <>
                    {req.completedAt && (
                      <div style={{
                        marginTop: 12,
                        padding: "10px 14px",
                        backgroundColor: "#f0fdf4",
                        borderRadius: 10,
                        border: "1px solid #bbf7d0",
                        fontFamily: "Inter",
                      }}>
                        <div style={{ fontSize: 12, color: "grey", fontWeight: 500, marginBottom: 4 }}>
                          Completed On
                        </div>
                        <div style={{ fontSize: 14, color: "#16a34a", fontWeight: 500 }}>
                          ✅ {new Date(req.completedAt).toLocaleDateString("en-US", {
                            month: "long", day: "numeric", year: "numeric",
                          })} at {new Date(req.completedAt).toLocaleTimeString("en-US", {
                            hour: "numeric", minute: "2-digit",
                          })}
                        </div>
                      </div>
                    )}
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/Jobdetails/${req.id}`, { state: { fromYourJobsStatus: "Completed" } })}
                    >
                      View Details
                    </button>
                  </>
                )}

              </div>
            );
          })}

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