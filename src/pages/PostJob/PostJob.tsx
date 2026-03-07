import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./postjob.css";

const SERVICE_TYPES = [
  { id: "rides", label: "Rides", emoji: "🚗" },
  { id: "groceries", label: "Groceries", emoji: "🛒" },
  { id: "cleaning", label: "Cleaning", emoji: "🧼" },
  { id: "tutoring", label: "Tutoring", emoji: "📚" },
  { id: "handyman", label: "Handyman", emoji: "🧑‍🔧" },
  { id: "cooking", label: "Cooking", emoji: "👨‍🍳" },
  { id: "moving", label: "Moving", emoji: "🚛" },
];

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
];

const POSTED_JOBS_KEY = "posted_jobs_v1";

type StoredJob = PostJobForm & {
  id: string;
  createdAt: string;
};

function readPostedJobs(): StoredJob[] {
  try {
    const raw = localStorage.getItem(POSTED_JOBS_KEY);
    return raw ? (JSON.parse(raw) as StoredJob[]) : [];
  } catch {
    return [];
  }
}

function writePostedJobs(jobs: StoredJob[]) {
  localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify(jobs));
}

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="16"
      y1="2"
      x2="16"
      y2="6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="8"
      y1="2"
      x2="8"
      y2="6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
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

interface PostJobForm {
  serviceType: string;
  title: string;
  date: string;
  time: string;
  budget: string;
  location: string;
  description: string;
}

const PostJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState<PostJobForm>({
    serviceType: "",
    title: "",
    date: "",
    time: "",
    budget: "",
    location: "",
    description: "",
  });

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const set =
    (field: keyof PostJobForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));



  const API_BASE_URL = "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

const [submitError, setSubmitError] = useState<string | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitError(null);
  setIsSubmitting(true);

  try {
    const res = await fetch(`${API_BASE_URL}/create_job.php`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // <-- uses your exact fields, nothing hardcoded
    });

    const data = await res.json();

    if (!data.success) {
      setSubmitError(data.message || "Failed to create job.");
      return;
    }

    navigate("/all-jobs");
  } catch (err) {
    setSubmitError("Network error creating job.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="postjob-page">
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
      <header className="postjob-header">
        <div className="postjob-header-inner">
          <button
            type="button"
            className="postjob-menu-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="postjob-title-block">
            <h1 className="postjob-page-title">Post A Job</h1>
            <p className="postjob-page-subtitle">
              Fill in the details below to post your job
            </p>
          </div>
        </div>
        <hr className="postjob-header-divider" />
      </header>

      {/* Form */}
      <form className="postjob-form" onSubmit={handleSubmit}>
        {/* Service Type */}
        <div className="postjob-service-section">
          <p className="postjob-service-label">
            Service type&nbsp;
            <span className="postjob-service-hint">
              (choose the best category to define the job you want done)
            </span>
          </p>
          <div className="postjob-service-grid">
            {SERVICE_TYPES.map((svc) => (
              <button
                key={svc.id}
                type="button"
                className={`postjob-service-btn${form.serviceType === svc.id ? " selected" : ""}`}
                onClick={() =>
                  setForm((prev) => ({ ...prev, serviceType: svc.id }))
                }
              >
                <span className="postjob-service-emoji">{svc.emoji}</span>
                <span className="postjob-service-name">{svc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Job Title */}
        <div className="postjob-field">
          <label className="postjob-field-label" htmlFor="pj-title">
            Job Title
          </label>
          <input
            id="pj-title"
            type="text"
            className="postjob-input"
            value={form.title}
            onChange={set("title")}
            placeholder=""
            autoComplete="off"
          />
        </div>

        {/* Date and Time */}
        <div className="postjob-datetime-row">
          <span className="postjob-datetime-label">Date and time</span>
          <div className="postjob-date-wrap">
            <span className="postjob-date-icon">
              <CalendarIcon />
            </span>
            <input
              type="date"
              className="postjob-input-date"
              value={form.date}
              onChange={set("date")}
            />
          </div>
          <div className="postjob-time-wrap">
            <span className="postjob-time-icon">
              <ClockIcon />
            </span>
            <input
              type="time"
              className="postjob-input-time"
              value={form.time}
              onChange={set("time")}
            />
          </div>
        </div>

        {/* Budget */}
        <div className="postjob-budget-row">
          <span className="postjob-budget-label">Budget</span>
          <input
            type="text"
            className="postjob-budget-input"
            placeholder="Enter your Budget"
            value={form.budget}
            onChange={set("budget")}
            autoComplete="off"
          />
        </div>

        {/* Location */}
        <div className="postjob-field">
          <label className="postjob-field-label" htmlFor="pj-location">
            Location
          </label>
          <input
            id="pj-location"
            type="text"
            className="postjob-input"
            placeholder="Enter Location"
            value={form.location}
            onChange={set("location")}
            autoComplete="off"
          />
        </div>

        {/* Description */}
        <div className="postjob-field">
          <label className="postjob-field-label" htmlFor="pj-description">
            Description
          </label>
          <textarea
            id="pj-description"
            className="postjob-textarea"
            placeholder="Describe in detail what you need done......."
            value={form.description}
            onChange={set("description")}
          />
        </div>

        {/* POST JOB + CANCEL */}
        <div className="postjob-actions">
          <button type="submit" className="postjob-btn-submit">
            POST JOB
          </button>
          <button
            type="button"
            className="postjob-btn-cancel"
            onClick={() => navigate(-1)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
