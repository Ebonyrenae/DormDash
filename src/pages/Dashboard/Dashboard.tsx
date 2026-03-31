import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../config";
import {
  getActivityPrimaryText,
  getDashboardRecentActivitiesForUser,
  type RecentActivityItem,
} from "../../utils/recentActivities";
import "./dashboard.css";

interface Job {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  time: string;
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

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Your Jobs", path: "/your-jobs" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
  
];

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

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 17H9M18 17V11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11V17L4.5 18.5V19H19.5V18.5L18 17Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type NotificationItem = {
  id: number;
  type: string;
  actor_user_id?: number | null;
  job_id: number | null;
  message: string;
  is_read: number | string;
  created_at: string;
};

type ToastItem = {
  id: number;
  message: string;
  jobId: number | null;
  actorUserId: number | null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [availableJobIds, setAvailableJobIds] = useState<Set<string>>(new Set());
  const [notificationsUnread, setNotificationsUnread] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const seenNotificationIds = useRef<Set<number>>(new Set());

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

  useEffect(() => {
    setRecentActivities(getDashboardRecentActivitiesForUser(4));
  }, [location.key]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/get_all_jobs.php`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success || !Array.isArray(data.jobs)) return;
        setAvailableJobIds(new Set(data.jobs.map((job: { id: number }) => String(job.id))));
      } catch {
        // Keep dashboard functional even if status fetch fails.
      }
    })();
  }, []);

  const isLoggedIn = useMemo(() => {
    return Boolean(localStorage.getItem("userId") || localStorage.getItem("user_id"));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(`${API_BASE}/notifications.php`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (cancelled) return;
        if (!data?.success) return;

        const unreadCount = Number(data.unreadCount || 0);
        setNotificationsUnread(unreadCount);

        const items: NotificationItem[] = Array.isArray(data.notifications)
          ? data.notifications
          : [];

        for (const n of items) {
          const idNum = Number(n.id);
          if (!idNum || seenNotificationIds.current.has(idNum)) continue;
          seenNotificationIds.current.add(idNum);

          const isUnread = String(n.is_read) === "0" || n.is_read === 0;
          if (!isUnread) continue;

          setToasts((prev) => [
            ...prev,
            {
              id: idNum,
              message: n.message,
              jobId: n.job_id ?? null,
              actorUserId: (n.actor_user_id ?? null) as number | null,
            },
          ]);
        }
      } catch {
        // Non-blocking.
      }
    };

    void tick();
    const interval = window.setInterval(() => void tick(), 15000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [isLoggedIn]);

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markToastRead = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/notifications_mark_read.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notification_id: id }),
      });
      const data = await res.json();
      if (!data?.success) return;
      setNotificationsUnread((c) => (c > 0 ? c - 1 : 0));
    } catch {
      // Non-blocking.
    } finally {
      dismissToast(id);
    }
  };

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
      <div className="notif-toast-stack" aria-live="polite" aria-relevant="additions">
        {toasts.map((t) => (
          <div key={t.id} className="notif-toast">
            <div className="notif-toast-row">
              <div className="notif-toast-message">{t.message}</div>
              <div className="notif-toast-actions">
                <button
                  type="button"
                  className="notif-toast-btn"
                  onClick={() => void markToastRead(t.id)}
                >
                  Mark read
                </button>
                <button
                  type="button"
                  className="notif-toast-x"
                  aria-label="Dismiss notification"
                  onClick={() => dismissToast(t.id)}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="notif-toast-links">
              {t.actorUserId ? (
                <button
                  type="button"
                  className="notif-toast-link secondary"
                  onClick={() => {
                    dismissToast(t.id);
                    navigate(`/messages/${t.actorUserId}`);
                  }}
                >
                  Message them
                </button>
              ) : null}
              {t.jobId ? (
                <button
                  type="button"
                  className="notif-toast-link"
                  onClick={() => {
                    dismissToast(t.id);
                    navigate(`/Jobdetails/${t.jobId}`);
                  }}
                >
                  View job
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

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

          <div className="nav-right">
            <button
              type="button"
              className="nav-bell"
              onClick={() => navigate("/notifications")}
              aria-label="Open notifications"
              title="Notifications"
            >
              <BellIcon />
              {notificationsUnread > 0 ? (
                <span className="nav-bell-badge" aria-label={`${notificationsUnread} unread`} />
              ) : null}
            </button>
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
                onClick={() => navigate("/recent-activities")}
              >
                See all →
              </button>
            </div>

            <div className="activity-grid">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => {
                  const isAvailable = availableJobIds.has(activity.jobId);
                  const isAcceptedByYou = activity.eventType === "accepted_job";
                  const availabilityLoaded = availableJobIds.size > 0;
                  const recentAvailability =
                    availabilityLoaded && !isAvailable && !isAcceptedByYou
                      ? "picked_by_other"
                      : "available";

                  return (
                  <div
                    key={activity.jobId}
                    className="activity-card"
                    onClick={() =>
                      navigate(`/jobDetails/${activity.jobId}`, {
                        state: {
                          fromPath: location.pathname,
                          recentAvailability,
                          recentActivity: activity,
                        },
                      })
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      navigate(`/jobDetails/${activity.jobId}`, {
                        state: {
                          fromPath: location.pathname,
                          recentAvailability,
                          recentActivity: activity,
                        },
                      })
                    }
                  >
                    <div className="activity-top-row">
                      <p className="activity-title">{activity.title}</p>
                      {activity.budget ? (
                        <span className="activity-budget">{activity.budget}</span>
                      ) : null}
                    </div>
                    <p className="activity-time-row">
                      <span className="activity-icon">
                        <ClockIcon />
                      </span>
                      {getActivityPrimaryText(activity)}
                    </p>
                    {activity.location || activity.category ? (
                      <span className="activity-chip">
                        {activity.location ?? activity.category}
                      </span>
                    ) : null}
                  </div>
                  );
                })
              ) : (
                <div className="empty-state">No recent activities</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
