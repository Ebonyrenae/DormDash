import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../config";
import "./dashboard.css";

interface Job {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  time: string;
}

interface Activity {
  id: string;
  title: string;
  status: "Completed" | "In Progress" | "Pending";
  timeAgo: string;
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Pick up food from Commons",
    description: "Need someone to grab my lunch from the dining hall",
    price: 5,
    location: "North Campus",
    time: "12:30 PM",
  },
  {
    id: "2",
    title: "Library book return",
    description: "Return 3 books to the main library",
    price: 10,
    location: "Silverman",
    time: "12:30 PM",
  },
];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "Coffee Delivery",
    status: "Completed",
    timeAgo: "3 hours ago",
  },
  {
    id: "2",
    title: "Package pickup from mailroom",
    status: "Completed",
    timeAgo: "Yesterday",
  },
  {
    id: "3",
    title: "Tutoring Help",
    status: "Completed",
    timeAgo: "Yesterday",
  },
  {
    id: "4",
    title: "Coffee Delivery",
    status: "Completed",
    timeAgo: "3 days ago",
  },
];

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
  { label: "Your Jobs", path: "/your-jobs" }
];

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4L12 14.01L9 11.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
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
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileUsername, setProfileUsername] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || localStorage.getItem("user_id");
    if (!userId) return;
    fetch(`${API_BASE}/get_user.php?id=${userId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setProfilePhoto(data.user.profilePhoto ?? data.user.profile_photo ?? null);
          setProfileUsername(data.user.username ?? null);
        }
      })
      .catch(() => {});
  }, []);

  const userInitials =
    profileUsername && profileUsername.length >= 2
      ? profileUsername
          .split(/\s+/)
          .map((s) => s[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : profileUsername
        ? profileUsername.slice(0, 2).toUpperCase()
        : "JD";
  const avatarUrl =
    profilePhoto &&
    `${API_BASE}/get_profile_photo.php?f=${encodeURIComponent(profilePhoto)}`;

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  return (
    <div className="dashboard-page">
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

      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="dashboard-nav-content">
          <div className="dashboard-nav-left">
            <button
              className="nav-back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
            <button
              className="nav-menu-btn"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className="dashboard-logo" onClick={() => navigate("/")}>
            DormDash
          </div>

          <div
            className="nav-avatar"
            onClick={() => navigate("/profile")}
            title="View profile"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="nav-avatar-img"
              />
            ) : (
              userInitials
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Action Buttons */}
        <div className="dashboard-actions">
          <button className="action-btn" onClick={() => navigate("/all-jobs")}>
            View all jobs
          </button>
          <button className="action-btn" onClick={() => navigate("/post-job")}>
            Post a job
          </button>
          <button
            className="action-btn"
            onClick={() => navigate("/my-requests")}
          >
            My requests
          </button>
        </div>

        {/* Two-column grid */}
        <div className="dashboard-grid">
          {/* Available Jobs */}
          <section>
            <div className="section-header">
              <h2 className="section-heading">Available Jobs</h2>
              <button
                className="section-link"
                onClick={() => navigate("/all-jobs")}
              >
                See all →
              </button>
            </div>

            <div className="jobs-list">
              {MOCK_JOBS.length > 0 ? (
                MOCK_JOBS.map((job) => (
                  <div
                    key={job.id}
                    className="job-card"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && navigate(`/jobs/${job.id}`)
                    }
                  >
                    <div className="job-card-top">
                      <h3 className="job-title">{job.title}</h3>
                      <span className="job-price">${job.price}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                    <div className="job-meta">
                      <span className="job-meta-item">
                        <LocationIcon />
                        {job.location}
                      </span>
                      <span className="job-meta-item">
                        <ClockIcon />
                        {job.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  No jobs available right now. Check back soon!
                </div>
              )}
            </div>
          </section>

          {/* Recent Activities */}
          <section>
            <div className="section-header">
              <h2 className="section-heading">Recent Activities</h2>
              <button
                className="section-link"
                onClick={() => navigate("/my-requests")}
              >
                See all →
              </button>
            </div>

            <div className="activity-grid">
              {MOCK_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="activity-card"
                  onClick={() => navigate(`/my-requests/${activity.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate(`/my-requests/${activity.id}`)
                  }
                >
                  <div className="activity-icon">
                    <CheckCircleIcon />
                  </div>
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-status">{activity.status}</p>
                  <p className="activity-time">{activity.timeAgo}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
