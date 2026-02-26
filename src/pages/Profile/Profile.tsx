import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./profile.css";

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
];

/* ── Icons ── */
const AvatarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="#c4c4c4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#c4c4c4" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Mock data — swap with real API later ── */
const USER = {
  name: "Mary",
  university: "University at Buffalo",
  major: "Computer Science, Junior",
  memberSince: "Feb 2025",
  rating: 4.9,
  jobsCompleted: 24,
  bio: "Hey! I'm a CS major who loves helping with tech and tutoring. Always down to lend a hand around campus.",
  experience: [
    { emoji: "📚", label: "15 Tutoring sessions completed" },
    { emoji: "🚗", label: "5 Rides given" },
    { emoji: "🚛", label: "4 Moving jobs" },
  ],
  reviews: [
    { stars: 5, text: "Great tutor!", author: "@sarah" },
    {
      stars: 5,
      text: "Super punctual and friendly, highly recommend!",
      author: "@mike_j",
    },
    {
      stars: 5,
      text: "Helped me move in record time. Amazing!",
      author: "@emily_d",
    },
  ],
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/me.php",
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (data.loggedIn) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("me.php failed", err);
      }
    };

    fetchUser();
  }, []);

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const renderStars = (count: number) => "⭐".repeat(Math.round(count));

  return (
    <div className="profile-page">
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

      {/* ── Hero banner ── */}
      <div className="profile-hero">
        {/* Hamburger */}
        <button
          className="profile-menu-btn"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Avatar centred on banner bottom edge */}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            <AvatarIcon />
          </div>
        </div>

        {/* Edit button */}
        <button
          className="profile-edit-btn"
          onClick={() => {
            /* TODO: edit profile */
          }}
        >
          <EditIcon />
          Edit
        </button>
      </div>

      {/* ── Body ── */}
      <div className="profile-body">
        {/* Name */}
        <h1 className="profile-name">{user?.username ?? "Loading..."}</h1>

        {/* Info card */}
        <div className="profile-info-card">
          <div className="profile-info-item">
            <span className="profile-info-label">University</span>
            <span className="profile-info-value">{USER.university}</span>
          </div>

          <div className="profile-info-divider" />

          <div className="profile-info-item">
            <span className="profile-info-label">Program</span>
            <span className="profile-info-value">{USER.major}</span>
          </div>

          <div className="profile-info-divider" />

          <div className="profile-info-item">
            <span className="profile-info-label">Member since</span>
            <span className="profile-info-value">{USER.memberSince}</span>
          </div>

          <div className="profile-info-divider" />

          <div className="profile-info-item">
            <span className="profile-info-label">Rating</span>
            <div className="profile-rating-row">
              <span className="profile-stars">{renderStars(USER.rating)}</span>
              <span className="profile-rating-num">({USER.rating})</span>
            </div>
          </div>

          <div className="profile-info-divider" />

          <div className="profile-info-item">
            <span className="profile-info-label">Jobs done</span>
            <span className="profile-stat-pill">
              {USER.jobsCompleted} completed
            </span>
          </div>
        </div>

        {/* Bio + Experience two-column */}
        <div className="profile-cols">
          {/* Bio */}
          <div className="profile-section-card">
            <h2 className="profile-section-title">Bio</h2>
            <p className="profile-bio-text">{USER.bio}</p>
          </div>

          {/* Experience */}
          <div className="profile-section-card">
            <h2 className="profile-section-title">Experience</h2>
            <ul className="profile-exp-list">
              {USER.experience.map((item, i) => (
                <li key={i} className="profile-exp-item">
                  <span className="profile-exp-check">
                    <CheckIcon />
                  </span>
                  {item.emoji} {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews */}
        <div className="profile-reviews-card">
          <h2 className="profile-reviews-title">Reviews</h2>
          <div className="profile-reviews-list">
            {USER.reviews.map((r, i) => (
              <div key={i} className="profile-review-item">
                <span className="profile-review-stars">
                  {renderStars(r.stars)}
                </span>
                <p className="profile-review-text">"{r.text}"</p>
                <p className="profile-review-author">— {r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
