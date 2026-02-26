import { useState } from "react";
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
  location: string;
  budget: string;
  offersCount: number;
}

const MY_REQUESTS: Request[] = [
  {
    id: "1",
    category: "Ride",
    categoryEmoji: "🚗",
    status: "Active",
    title: "Ride to Airport",
    description: "I need a ride to the airport for spring break",
    dateTime: "Sat, Feb 14, 2026\n14:30",
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
    location: "Library Study Room 3",
    budget: "$30",
    offersCount: 2,
  },
];

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
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const activeCount = MY_REQUESTS.filter((r) => r.status === "Active").length;
  const inProgressCount = MY_REQUESTS.filter(
    (r) => r.status === "In Progress",
  ).length;
  const completedCount = MY_REQUESTS.filter(
    (r) => r.status === "Completed",
  ).length;

  const filtered =
    activeFilter === "All"
      ? MY_REQUESTS
      : MY_REQUESTS.filter((r) => r.status === activeFilter);

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

              <h3 className="request-card-title">{req.title}</h3>
              <p className="request-card-description">{req.description}</p>

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

              <div className="request-card-footer">
                <span className="request-offers-text">
                  {req.offersCount} {req.offersCount === 1 ? "offer" : "offers"}{" "}
                  received
                </span>
                <button
                  className="btn-view-details"
                  onClick={() => navigate(`/my-requests/${req.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyRequests;
