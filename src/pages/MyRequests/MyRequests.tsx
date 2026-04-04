import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../config";
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
  completionCode?:  string | null;
  confirmationCode?: string | null;
}

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



const API_BASE_URL = API_BASE;

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





const MY_REQUESTS: Request[] = [
  {
    id: "1",
    category: "Ride",
    categoryEmoji: "🚗",
    status: "Active",
    title: "Ride to Airport",
    description: "I need a ride to the airport for spring break",
    dateTime: "Sat, Feb 14, 2026\n14:30",
    jobDate: "2026-02-14",
    jobTime: "14:30",
    location: "Hadley Village → Airport",
    budget: "$25",
    offersCount: 3,
  },
  {
    id: "2",
    category: "Cleaning",
    categoryEmoji: "🧼",
    status: "In Progress",
    title: "Bathroom Cleaning",
    description: "Need someone to deep clean a shared bathroom",
    dateTime: "Sat, Feb 14, 2026\n14:30",
    jobDate: "2026-02-14",
    jobTime: "14:30",
    location: "Ellicot Complex",
    budget: "$25",
    offersCount: 1,
  },
  {
    id: "3",
    category: "Food",
    categoryEmoji: "🍔",
    status: "Completed",
    title: "Lunch Pickup",
    description:
      "I need someone to pick up my lunch from the commons at Dancing Chop Sticks",
    dateTime: "Sat, Feb 14, 2026\n14:30",
    jobDate: "2026-02-14",
    jobTime: "14:30",
    location: "UB commons → Flint Village",
    budget: "$5",
    offersCount: 5,
  },
  {
    id: "4",
    category: "Tutoring",
    categoryEmoji: "📚",
    status: "Active",
    title: "Math Tutoring",
    description: "Need help with Calculus 2 homework",
    dateTime: "Sun, Feb 15, 2026\n16:00",
    jobDate: "2026-02-15",
    jobTime: "16:00",
    location: "Library Study Room 3",
    budget: "$30",
    offersCount: 2,
  },
];

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
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <line
      x1="12"
      y1="1"
      x2="12"
      y2="23"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

        if (j.status === "active") {
          mappedStatus = "In Progress";
        }
        if (j.status === "in_progress") {
          mappedStatus = "In Progress";
        } else if (j.status === "completed") {
          mappedStatus = "Completed";
        } else if (j.status === "pending") {
          mappedStatus = "Active";
        }

        const categoryLabel =
          j.service_type?.charAt(0).toUpperCase() + j.service_type.slice(1);

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
        };
      });

      setRequests(mapped);
    } catch {
      setLoadError("Network error loading your requests.");
    }
  };

  fetchJobs(); // run immediately on mount
  const interval = setInterval(fetchJobs, 5000); // poll every 5 seconds
  return () => clearInterval(interval); // cleanup on unmount
}, []);

useEffect(() => {
  setPostedJobs(readPostedJobs());
}, []);
const postedAsRequests: Request[] = useMemo(() => {



  
  return postedJobs.map((j) => {
    const dt = j.date && j.time ? new Date(`${j.date}T${j.time}`) : null;
    const prettyDate = dt
      ? dt.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : j.date;

    return {
      id: j.id,
      category: j.serviceType
        ? j.serviceType.charAt(0).toUpperCase() + j.serviceType.slice(1)
        : "Other",
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
    if (!titleTrim) {
      setEditError("Title cannot be empty.");
      return;
    }
    if (!locTrim) {
      setEditError("Location cannot be empty.");
      return;
    }
    if (!timeTrim) {
      setEditError("Time cannot be empty.");
      return;
    }
    if (!budgetTrim) {
      setEditError("Budget cannot be empty.");
      return;
    }
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
      if (!data.success) {
        setEditError(data.message || "Could not update job.");
        return;
      }
      setRequests((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                title: titleTrim,
                description: editDescription,
                location: locTrim,
                budget: budgetTrim,
                jobTime: timeTrim,
                dateTime: `${r.jobDate}\n${timeTrim}`,
              }
            : r,
        ),
      );
      cancelEdit();
    } catch {
      setEditError("Network error while updating job.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleCancelRequest = (id: string) => {
    const CANCEL_JOB = `${API_BASE_URL}/cancel_jobs.php`;

    fetch(CANCEL_JOB, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          // remove canceled request locally
          setRequests((prev) => prev.filter((r) => r.id !== id));
        } else {
          console.error("Cancel failed", data?.message);
        }
      })
      .catch((err) => {
        console.error("Network error cancelling job", err);
      });
  };

 const handleUnassignRequest = (id: string) => {
  const UNASSIGN_JOB = `${API_BASE_URL}/unassign_job.php`;
  const userId = localStorage.getItem("userId");

  fetch(UNASSIGN_JOB, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: id, user_id: userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.success) {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: "Active" as StatusType } : r
          )
        );
      } else {
        console.error("Unassign failed", data?.message);
      }
    })
    .catch((err) => {
      console.error("Network error unassigning job", err);
    });
};


  const activeCount = requests.filter((r) => r.status === "Active").length;
  const inProgressCount = requests.filter(
    (r) => r.status === "In Progress",
  ).length;
  const completedCount = requests.filter(
    (r) => r.status === "Completed",
  ).length;

  const filtered =
    activeFilter === "All"
      ? requests
      : requests.filter((r) => r.status === activeFilter);

  return (
    <div className="requests-page">
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
          <h1 className="requests-page-title">My Requests</h1>
        </div>
        <hr className="requests-header-divider" />
      </header>

      {/* Main */}
      <main className="requests-main">
        {/* Stats */}
        <div className="requests-stats-row">
          <div
            className={`stat-card${activeFilter === "Active" || activeFilter === "All" ? " stat-active" : ""}`}
            onClick={() =>
              setActiveFilter(activeFilter === "Active" ? "All" : "Active")
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setActiveFilter(activeFilter === "Active" ? "All" : "Active")
            }
          >
            <div className="stat-card-number color-green">{activeCount}</div>
            <div className="stat-card-label">Active Requests</div>
          </div>

          <div
            className={`stat-card${activeFilter === "In Progress" ? " stat-active" : ""}`}
            onClick={() =>
              setActiveFilter(
                activeFilter === "In Progress" ? "All" : "In Progress",
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setActiveFilter(
                activeFilter === "In Progress" ? "All" : "In Progress",
              )
            }
          >
            <div className="stat-card-number color-orange">
              {inProgressCount}
            </div>
            <div className="stat-card-label">In Progress</div>
          </div>

          <div
            className={`stat-card${activeFilter === "Completed" ? " stat-active" : ""}`}
            onClick={() =>
              setActiveFilter(
                activeFilter === "Completed" ? "All" : "Completed",
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setActiveFilter(
                activeFilter === "Completed" ? "All" : "Completed",
              )
            }
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
                  <span className="category-badge-emoji">
                    {req.categoryEmoji}
                  </span>
                  <span>{req.category}</span>
                </div>
                <span className={`status-badge ${statusClass[req.status]}`}>
                  {req.status}
                </span>
              </div>

              {editingId === req.id ? (
                <div className="request-edit-fields">
                  <label className="request-edit-label" htmlFor={`edit-title-${req.id}`}>
                    Title
                  </label>
                  <input
                    id={`edit-title-${req.id}`}
                    className="request-edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    disabled={savingEdit}
                  />
                  <label className="request-edit-label" htmlFor={`edit-desc-${req.id}`}>
                    Description
                  </label>
                  <textarea
                    id={`edit-desc-${req.id}`}
                    className="request-edit-textarea"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    disabled={savingEdit}
                    rows={3}
                  />
                  {req.jobDate ? (
                    <>
                      <span className="request-edit-label">Job date</span>
                      <p className="request-edit-readonly">{req.jobDate}</p>
                    </>
                  ) : null}
                  <label className="request-edit-label" htmlFor={`edit-loc-${req.id}`}>
                    Location
                  </label>
                  <input
                    id={`edit-loc-${req.id}`}
                    className="request-edit-input"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    disabled={savingEdit}
                  />
                  <label className="request-edit-label" htmlFor={`edit-time-${req.id}`}>
                    Time
                  </label>
                  <input
                    id={`edit-time-${req.id}`}
                    type="time"
                    className="request-edit-input"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    disabled={savingEdit}
                  />
                  <label className="request-edit-label" htmlFor={`edit-budget-${req.id}`}>
                    Budget
                  </label>
                  <input
                    id={`edit-budget-${req.id}`}
                    className="request-edit-input"
                    value={editBudget}
                    onChange={(e) => setEditBudget(e.target.value)}
                    disabled={savingEdit}
                  />
                  {editError && (
                    <p className="request-edit-error" role="alert">
                      {editError}
                    </p>
                  )}
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
                    <span className="request-meta-key">
                      <ClockIcon /> Date &amp; Time
                    </span>
                    <span
                      className="request-meta-value"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {req.dateTime}
                    </span>
                  </div>
                  <div className="request-meta-item">
                    <span className="request-meta-key">
                      <LocationIcon /> Location
                    </span>
                    <span className="request-meta-value">{req.location}</span>
                  </div>
                  <div className="request-meta-item">
                    <span className="request-meta-key">
                      <DollarIcon /> Budget
                    </span>
                    <span className="request-meta-value budget-value">
                      {req.budget}
                    </span>
                  </div>
                </div>
              )}

              <div className="request-card-footer">
                <span className="request-offers-text">
                  {req.offersCount} {req.offersCount === 1 ? "offer" : "offers"}{" "}
                  received
                </span>
                <div className="request-card-actions">
                  {!(req.status === "Active" && editingId === req.id) && (
                    <button
                      className="btn-view-detail"
                      onClick={() => navigate(`/my-request/${req.id}`)}
                    >
                      View Details
                    </button>
                  )}

                  {req.status === "Active" && editingId !== req.id && (
                    <button
                      type="button"
                      className="edit-job-btn"
                      onClick={() => beginEdit(req)}
                    >
                      Edit job
                    </button>
                  )}

                  {req.status === "Active" && editingId === req.id && (
                    <>
                      <button
                        type="button"
                        className="edit-job-btn"
                        onClick={() => void saveEdit()}
                        disabled={savingEdit}
                      >
                        {savingEdit ? "Saving…" : "Save changes"}
                      </button>
                      <button
                        type="button"
                        className="btn-view-details"
                        onClick={cancelEdit}
                        disabled={savingEdit}
                      >
                        Discard
                      </button>
                    </>
                  )}

                  {req.status === "Active" && editingId !== req.id && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelRequest(req.id)}
                    >
                      Cancel Job
                    </button>
                  )}

  {/* {(req.status === "In Progress") && (
    <p className ="job-code">
      Completion Code: <strong>{req.completionCode ?? ""}</strong>
    </p>
  )} */}

                  {req.status === "In Progress" && (
                    <button
                      className="unassign-btn"
                      onClick={() => handleUnassignRequest(req.id)}
                    >
                      Unassign Dasher
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


export default MyRequests;
