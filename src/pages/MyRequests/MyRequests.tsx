import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./myrequests.css";

type StatusType = "Active" | "In Progress" | "Completed";

interface Request {
  id: string;
  category: string;
  categoryEmoji: string;
  status: StatusType;
  title: string;
  description: string;
  dateTime: string;
  jobDate: string;
  jobTime: string;
  location: string;
  budget: string;
  offersCount: number;
  completionCode?: string | null;
  confirmationCode?: string | null;
  offerStatus?: "pending" | "accepted" | "declined" | null;
  offeredPrice?: string | null;
  offerNote?: string | null;
  acceptedByName?: string;
  accepted_by?: number | null;
  hasReviewed?: boolean;
}

const API_BASE_URL =
  "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";


const POSTED_JOBS_KEY = "posted_jobs_v1";

type StoredJob = {
  id: string;
  createdAt: string;
  serviceType: string;
  title: string;
  date: string;
  time: string;
  budget: string;
  location: string;
  description: string;
};

function readPostedJobs(): StoredJob[] {
  try {
    const raw = localStorage.getItem(POSTED_JOBS_KEY);
    return raw ? (JSON.parse(raw) as StoredJob[]) : [];
  } catch {
    return [];
  }
}



type BackendJob = {
  id: number;
  service_type: string;
  title: string;
  description: string | null;
  budget: string;
  location: string;
  status: string;
  job_date: string;
  job_time: string;
  proposed_price?: string | null;
  price_note?: string | null;
  price_status?: "pending" | "accepted" | "declined" | null;
  accepted_by_name?: string | null;
  accepted_by?: number | null;
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

type FilterTab = "All" | StatusType;

const MyRequests = () => {
  const [postedJobs, setPostedJobs] = useState<StoredJob[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editBudget, setEditBudget] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [reviewJobId, setReviewJobId] = useState<string | null>(null);
  const [reviewDasherName, setReviewDasherName] = useState<string>("");
  const [reviewDasherId, setReviewDasherId] = useState<number | null>(null);
  const [starRating, setStarRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [reviewError, setReviewError] = useState<string>("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadError(null);
        const res = await fetch(`${API_BASE_URL}/get_my_jobs.php`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!data.success) {
          setLoadError(data.message || "Failed to load your requests.");
          return;
        }

        const mapped: Request[] = (data.jobs as BackendJob[]).map((j) => {
          let mappedStatus: StatusType = "Active";
          if (j.status === "active") mappedStatus = "In Progress";
          if (j.status === "in_progress") mappedStatus = "In Progress";
          else if (j.status === "completed") mappedStatus = "Completed";
          else if (j.status === "pending") mappedStatus = "Active";

          const categoryLabel = j.service_type?.charAt(0).toUpperCase() + j.service_type.slice(1);
          const time = j.job_time?.slice(0, 5) ?? "";
          const dateTime = `${j.job_date}\n${time}`;

          return {
            id: String(j.id),
            category: categoryLabel,
            categoryEmoji: SERVICE_EMOJI[j.service_type] ?? "🧾",
            status: mappedStatus,
            title: j.title,
            description: j.description ?? "",
            dateTime,
            jobDate: j.job_date ?? "",
            jobTime: time,
            location: j.location,
            budget: j.budget,
            completionCode: (j as any).completion_code ?? null,
            confirmationCode: (j as any).confirmation_code ?? null,
            offersCount: 0,
            offerStatus: j.price_status ?? null,
            offeredPrice: j.proposed_price ?? null,
            offerNote: j.price_note ?? null,
            acceptedByName: j.accepted_by_name ?? "Dasher",
            accepted_by: j.accepted_by ?? null,
            hasReviewed: (j as any).has_reviewed === 1,
          };
        });

        setRequests(mapped);
      } catch {
        setLoadError("Network error loading your requests.");
      }
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPostedJobs(readPostedJobs());
  }, []);

  const postedAsRequests: Request[] = useMemo(() => {
    return postedJobs.map((j) => {
      const dt = j.date && j.time ? new Date(`${j.date}T${j.time}`) : null;
      const prettyDate = dt
        ? dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
        : j.date;
      return {
        id: j.id,
        category: j.serviceType ? j.serviceType.charAt(0).toUpperCase() + j.serviceType.slice(1) : "Other",
        categoryEmoji: SERVICE_EMOJI[j.serviceType] ?? "🧾",
        status: "Active",
        title: j.title,
        description: j.description,
        dateTime: `${prettyDate}\n${j.time || ""}`.trim(),
        jobDate: j.date || "",
        jobTime: j.time?.slice(0, 5) || "",
        location: j.location,
        budget: j.budget?.trim().startsWith("$") ? j.budget.trim() : `$${j.budget}`,
        offersCount: 0,
        completionCode: null,
      };
    });
  }, [postedJobs]);

  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Active");

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const beginEdit = (req: Request) => {
    setEditError(null);
    setEditingId(req.id);
    setEditTitle(req.title);
    setEditDescription(req.description);
    setEditLocation(req.location);
    setEditTime(req.jobTime);
    setEditBudget(req.budget);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError(null);
    setSavingEdit(false);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const titleTrim = editTitle.trim();
    const locTrim = editLocation.trim();
    const timeTrim = editTime.trim();
    const budgetTrim = editBudget.trim();
    if (!titleTrim) { setEditError("Title cannot be empty."); return; }
    if (!locTrim) { setEditError("Location cannot be empty."); return; }
    if (!timeTrim) { setEditError("Time cannot be empty."); return; }
    if (!budgetTrim) { setEditError("Budget cannot be empty."); return; }
    setEditError(null);
    setSavingEdit(true);
    try {
      const res = await fetch(`${API_BASE_URL}/update_job.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: Number(editingId),
          title: titleTrim,
          description: editDescription,
          location: locTrim,
          time: timeTrim,
          budget: budgetTrim,
        }),
      });
      const data = await res.json();
      if (!data.success) { setEditError(data.message || "Could not update job."); return; }
      setRequests((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { ...r, title: titleTrim, description: editDescription, location: locTrim, budget: budgetTrim, jobTime: timeTrim, dateTime: `${r.jobDate}\n${timeTrim}` }
            : r
        )
      );
      cancelEdit();
    } catch {
      setEditError("Network error while updating job.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleCancelRequest = (id: string) => {
    fetch(`${API_BASE_URL}/cancel_jobs.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setRequests((prev) => prev.filter((r) => r.id !== id));
        } else {
          console.error("Cancel failed", data?.message);
        }
      })
      .catch((err) => console.error("Network error cancelling job", err));
  };

  const handleUnassignRequest = (id: string) => {
    const userId = localStorage.getItem("userId");
    fetch(`${API_BASE_URL}/unassign_job.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: id, user_id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setRequests((prev) =>
            prev.map((r) => r.id === id ? { ...r, status: "Active" as StatusType } : r)
          );
        } else {
          console.error("Unassign failed", data?.message);
        }
      })
      .catch((err) => console.error("Network error unassigning job", err));
  };
  
  const handleSubmitReview = async () => {
  if (starRating === 0) {
    setReviewError("Please select a star rating.");
    return;
  }
  setReviewSubmitting(true);
  setReviewError("");
  try {
    const res = await fetch(`${API_BASE_URL}/submit_review.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: reviewJobId,
        dasher_id: reviewDasherId,
        stars: starRating,
        review_text: reviewText,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setReviewSuccess(false);
        setStarRating(0);
        setReviewText("");
        setReviewJobId(null);
        setReviewSubmitting(false);
      }, 1500);
    } else {
      setReviewError(data.message || "Failed to submit review.");
    }
  } catch {
    setReviewError("Network error. Please try again.");
  } finally {
    setReviewSubmitting(false);
  }
};

  const handleRespondToOffer = async (jobId: string, action: "accept" | "decline") => {
  try {
    const res = await fetch(`${API_BASE_URL}/respond_to_offer.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: jobId, action }),
    });
    
    const data = await res.json();
    
    if (data.success) {
      // 1. Update the local state immediately so the banner disappears
      setRequests((prev) =>
        prev.map((r) =>
          r.id === jobId
            ? {
                ...r,
                offerStatus: action === "accept" ? "accepted" : "declined",
                // If accepted, we show the new price immediately
                budget: action === "accept" && r.offeredPrice ? `$${r.offeredPrice}` : r.budget,
                offeredPrice: null,
                offerNote: null,
              }
            : r
        )
      );
      
      // 2. FORCE an immediate refresh from the server to sync everything
      // fetchJobs(); 
    } else {
      alert("Server error: " + data.message);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};

  const activeCount = requests.filter((r) => r.status === "Active").length;
  const inProgressCount = requests.filter((r) => r.status === "In Progress").length;
  const completedCount = requests.filter((r) => r.status === "Completed").length;

  const allRequests = [...requests, ...postedAsRequests];
  const filtered = activeFilter === "All" ? allRequests : allRequests.filter((r) => r.status === activeFilter);

  return (
    <>
    {showReviewModal && (
  <div className="review-modal-overlay">
    <div className="review-modal-box">
      <button
        className="review-modal-close"
        onClick={() => setShowReviewModal(false)}
      >
        ✕
      </button>

      {reviewSuccess ? (
        <div className="review-success">
          <div className="review-success-icon">✅</div>
          <p className="review-success-text">Review Submitted!</p>
        </div>
      ) : (
        <>
          <div className="review-modal-header">
            <div className="review-avatar">
              {reviewDasherName?.charAt(0).toUpperCase()}
            </div>
            <h3 className="review-modal-title">
              Rate Your DormDasher
            </h3>
            <p className="review-modal-subtitle">@{reviewDasherName}</p>
          </div>

          <div className="review-stars-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`review-star ${star <= (hoveredStar || starRating) ? "filled" : ""}`}
                onClick={() => setStarRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                ★
              </span>
            ))}
          </div>
          <p className="review-stars-label">
            {starRating === 1 && "Poor"}
            {starRating === 2 && "Fair"}
            {starRating === 3 && "Good"}
            {starRating === 4 && "Great"}
            {starRating === 5 && "Excellent!"}
          </p>

          <textarea
            className="review-textarea"
            placeholder="Leave a comment (optional)..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
          />

          {reviewError && (
            <p className="review-error">{reviewError}</p>
          )}

          <div className="review-modal-actions">
            <button
              className="review-cancel-btn"
              onClick={() => setShowReviewModal(false)}
            >
              Cancel
            </button>
            <button
              className="review-submit-btn"
              onClick={handleSubmitReview}
              disabled={reviewSubmitting}
            >
              {reviewSubmitting ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}
    <div className="requests-page">
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside className={`sidebar-drawer${sidebarOpen ? " open" : ""}`} aria-label="Navigation menu">
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

      <header className="requests-header">
        <div className="requests-header-inner">
          <button className="requests-menu-btn" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
            <span /><span /><span />
          </button>
          <h1 className="requests-page-title">My Requests</h1>
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
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveFilter(activeFilter === "Active" ? "All" : "Active")}
          >
            <div className="stat-card-number color-green">{activeCount}</div>
            <div className="stat-card-label">Active Requests</div>
          </div>

          <div
            className={`stat-card${activeFilter === "In Progress" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter( "In Progress")}
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveFilter(activeFilter === "In Progress" ? "All" : "In Progress")}
          >
            <div className="stat-card-number color-orange">{inProgressCount}</div>
            <div className="stat-card-label">In Progress</div>
          </div>

          <div
            className={`stat-card${activeFilter === "Completed" ? " stat-active" : ""}`}
            onClick={() => setActiveFilter("Completed")}
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveFilter(activeFilter === "Completed" ? "All" : "Completed")}
          >
            <div className="stat-card-number color-gray">{completedCount}</div>
            <div className="stat-card-label">Completed</div>
          </div>
        </div>

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

              {editingId === req.id ? (
                <div className="request-edit-fields">
                  <label className="request-edit-label" htmlFor={`edit-title-${req.id}`}>Title</label>
                  <input id={`edit-title-${req.id}`} className="request-edit-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={savingEdit} />
                  <label className="request-edit-label" htmlFor={`edit-desc-${req.id}`}>Description</label>
                  <textarea id={`edit-desc-${req.id}`} className="request-edit-textarea" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} disabled={savingEdit} rows={3} />
                  {req.jobDate ? (<><span className="request-edit-label">Job date</span><p className="request-edit-readonly">{req.jobDate}</p></>) : null}
                  <label className="request-edit-label" htmlFor={`edit-loc-${req.id}`}>Location</label>
                  <input id={`edit-loc-${req.id}`} className="request-edit-input" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} disabled={savingEdit} />
                  <label className="request-edit-label" htmlFor={`edit-time-${req.id}`}>Time</label>
                  <input id={`edit-time-${req.id}`} type="time" className="request-edit-input" value={editTime} onChange={(e) => setEditTime(e.target.value)} disabled={savingEdit} />
                  <label className="request-edit-label" htmlFor={`edit-budget-${req.id}`}>Budget</label>
                  <input id={`edit-budget-${req.id}`} className="request-edit-input" value={editBudget} onChange={(e) => setEditBudget(e.target.value)} disabled={savingEdit} />
                  {editError && <p className="request-edit-error" role="alert">{editError}</p>}
                </div>
              ) : (
                <>
                  <h3 className="request-card-title">{req.title}</h3>
                  <p className="request-card-description">{req.description}</p>
                </>
              )}

            

              {editingId !== req.id && (
                <div className="request-card-meta">
                  <div className="request-meta-item">
                    <span className="request-meta-key"><ClockIcon /> Date &amp; Time</span>
                    <span className="request-meta-value" style={{ whiteSpace: "pre-line" }}>{req.dateTime}</span>
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
              )}

              <div className="request-card-footer">
                <span className="request-offers-text">
                  {req.offersCount} {req.offersCount === 1 ? "offer" : "offers"} received
                </span>
                <div className="request-card-actions">
                  {!(req.status === "Active" && editingId === req.id) && (
                    <button className="btn-view-detail" onClick={() => navigate(`/my-request/${req.id}`)}>
                      View Details
                    </button>
                  )}

                  {req.status === "Active" && editingId !== req.id && (
                    <button type="button" className="edit-job-btn" onClick={() => beginEdit(req)}>
                      Edit job
                    </button>
                  )}

                  {req.status === "Active" && editingId === req.id && (
                    <>
                      <button type="button" className="edit-job-btn" onClick={() => void saveEdit()} disabled={savingEdit}>
                        {savingEdit ? "Saving…" : "Save changes"}
                      </button>
                      <button type="button" className="btn-view-details" onClick={cancelEdit} disabled={savingEdit}>
                        Discard
                      </button>
                    </>
                  )}

                  {req.status === "Active" && editingId !== req.id && (
                    <button className="cancel-btn" onClick={() => handleCancelRequest(req.id)}>
                      Cancel Job
                    </button>
                  )}

                  {req.status === "In Progress" && (
                    <button className="unassign-btn" onClick={() => handleUnassignRequest(req.id)}>
                      Unassign Dasher
                    </button>
                  )}
                   {req.status === "Completed" && (
                      req.hasReviewed ? (
                      <p style={{ color: "#16a34a", fontSize: 13, fontFamily: "Inter", fontWeight: 500 }}>
                         Thanks for submitting a review!
                        </p>):(
                        <button
                        className="pulse-button"
                        onClick={() => {
                          setReviewJobId(req.id);
                          setReviewDasherName(req.acceptedByName ?? "Dasher");
                          setReviewDasherId(req.accepted_by ?? null);
                          setStarRating(0);
                          setReviewText("");
                          setReviewError("");
                          setReviewSuccess(false);
                          setShowReviewModal(true);
                        }}
                      >
                        Leave Review for {req.acceptedByName}
                      </button>)
                    )}
                </div>
                 {/* ── Price Offer Banner — always visible when offer is pending ── */}
              {req.offerStatus === "accepted" && editingId !== req.id && (
                <div style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: 10,
                  fontFamily: "Inter",
                  width: "100%",
                }}>
                  <p style={{ fontWeight: 500, color: "#2563eb", marginBottom: 6 }}>
                     New Price Offer From Your DormDasher {req.acceptedByName}
                  </p>
                  {req.offerNote && (
                    <p style={{ fontSize: 13, color: "#374151", marginBottom: 8 ,textAlign: "center"}}>
                      Note: {req.offerNote}
                    </p>
                  )}
                  <p style={{ fontSize: 13, color: "#1e40af", marginBottom: 4 ,textAlign: "center"}}>
                    Offered Price: <strong>${req.offeredPrice}</strong>
                  </p>
                  
                  <div style={{ display: "flex", gap: 15, justifyContent: "center", marginTop: 6 }}>
                    <button
                      style={{ background: "#16a34a", color: "white", padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "Inter", fontSize: 13 }}
                      onClick={() => handleRespondToOffer(req.id, "accept")}
                    >
                      Accept Offer
                    </button>
                    <button
                      style={{ background: "#dc2626", color: "white", padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "Inter", fontSize: 13 }}
                      onClick={() => handleRespondToOffer(req.id, "decline")}
                    >
                      Decline Offer
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
     </>
  );
  
   
};
    


export default MyRequests;