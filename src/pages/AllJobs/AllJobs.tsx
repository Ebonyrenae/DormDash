import React from "react";
import { useState } from "react";
import { useEffect, useMemo} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./alljobs.css";

interface Job {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  time: string;
  category: string;
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



const API_BASE_URL =
  "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

type BackendJob = {
  id: number;
  service_type: string;
  title: string;
  description: string | null;
  budget: string;
  location: string;
  job_date: string;  // "YYYY-MM-DD"
  job_time: string;  // "HH:MM:SS"
};

function toCategoryLabel(serviceType: string): string {
  if (!serviceType) return "Others";
  return serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
}

function toTimeLabel(jobDate: string, jobTime: string): string {
  // Minimal: show time. (You can include date later if you want.)
  // jobTime is "HH:MM:SS"
  const t = jobTime?.slice(0, 5); // "HH:MM"
  return t || "";
}

const ALL_JOBS: Job[] = [
  {
    id: "1",
    title: "Pick up food from Commons",
    description: "Need someone to grab my lunch from the dining hall",
    price: "$5",
    location: "North Campus",
    time: "12:30 PM",
    category: "Groceries",
  },
  {
    id: "2",
    title: "Library book return",
    description: "Return 3 books to the main library",
    price: "$10",
    location: "Silverman",
    time: "12:30 PM",
    category: "Others",
  },
  {
    id: "3",
    title: "Ride to airport",
    description: "Need ride to airport for spring break",
    price: "$25",
    location: "Hadley Village",
    time: "12:30 PM",
    category: "Rides",
  },
  {
    id: "4",
    title: "Bathroom Cleaning",
    description: "Need someone to deep clean a shared bathroom",
    price: "$25",
    location: "Ellicot Complex",
    time: "12:30 PM",
    category: "Cleaning",
  },
  {
    id: "5",
    title: "Meal prep for the week",
    description: "Looking for someone to cook 5 meals for the week",
    price: "$50",
    location: "South lake Village",
    time: "12:30 PM",
    category: "Cooking",
  },
  {
    id: "6",
    title: "Math Tutoring needed",
    description:
      "Need Tutoring for calculus I this Thursday at the Lockwood Library",
    price: "$20/hr",
    location: "Ellicot Complex",
    time: "12:30 PM",
    category: "Tutoring",
  },
];

const CATEGORIES = [
  "All",
  "Cleaning",
  "Rides",
  "Tutoring",
  "Cooking",
  "Handyman",
  "Groceries",
  "Moving",
  "Others",
];

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
];

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
const [loadError, setLoadError] = useState<string | null>(null);

const [postedJobs, setPostedJobs] = useState<StoredJob[]>([]);

useEffect(() => {
  setPostedJobs(readPostedJobs());
}, []);

useEffect(() => {
  (async () => {
    try {
      setLoadError(null);
      const res = await fetch(`${API_BASE_URL}/get_all_jobs.php`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        setLoadError(data.message || "Failed to load jobs.");
        return;
      }

      const mapped: Job[] = (data.jobs as BackendJob[]).map((j) => ({
        id: String(j.id),
        title: j.title,
        description: j.description ?? "",
        price: j.budget,
        location: j.location,
        time: toTimeLabel(j.job_date, j.job_time),
        category: toCategoryLabel(j.service_type),
      }));

      setJobs(mapped);
    } catch {
      setLoadError("Network error loading jobs.");
    }
  })();
}, []);

  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const filtered =
    activeCategory === "All"
      ? jobs
      : jobs.filter((j) => j.category === activeCategory);

  return (
    <div className="alljobs-page">
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
      <header className="alljobs-header">
        <div className="alljobs-header-top">
          <button
            className="alljobs-menu-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <h1 className="alljobs-page-title">All Jobs</h1>
        </div>

        <div className="alljobs-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`alljobs-filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <hr className="alljobs-header-divider" />
      </header>

      {/* Main */}
      <main className="alljobs-main">
        <h2 className="alljobs-count-heading">
          {activeCategory === "All" ? "All Jobs" : activeCategory} (
          {filtered.length})
        </h2>

        <div className="alljobs-grid">
          {filtered.length > 0 ? (
            filtered.map((job) => (
              <div
                key={job.id}
                className="alljobs-card"
                onClick={() => navigate(`/jobs/${job.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/jobs/${job.id}`)
                }
              >
                <div className="alljobs-card-top">
                  <h3 className="alljobs-card-title">{job.title}</h3>
                  <span className="alljobs-card-price">{job.price}</span>
                </div>
                <p className="alljobs-card-description">{job.description}</p>
                <div className="alljobs-card-meta">
                  <span className="alljobs-meta-item">
                    <LocationIcon />
                    {job.location}
                  </span>
                  <span className="alljobs-meta-item">
                    <ClockIcon />
                    {job.time}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="alljobs-empty">No jobs found in this category.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllJobs;
