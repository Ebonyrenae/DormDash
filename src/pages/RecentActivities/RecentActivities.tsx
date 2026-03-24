import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getActivityPrimaryText,
  getAllRecentActivitiesForUser,
} from "../../utils/recentActivities";
import { API_BASE } from "../../config";
import "./recentactivities.css";

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
  { label: "Your Jobs", path: "/your-jobs" },
];

const RecentActivities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availableJobIds, setAvailableJobIds] = useState<Set<string>>(new Set());

  const activities = useMemo(() => getAllRecentActivitiesForUser(), []);

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
        // Keep UI functional if availability lookup fails.
      }
    })();
  }, []);

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  return (
    <div className="recent-activities-page">
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

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

      <header className="recent-activities-header">
        <button
          className="recent-activities-menu-btn"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="recent-activities-title">Recent Activities</h1>
      </header>

      <main className="recent-activities-main">
        {activities.length > 0 ? (
          <div className="recent-activities-grid">
            {activities.map((activity) => {
              const isAvailable = availableJobIds.has(activity.jobId);
              const isAcceptedByYou = activity.eventType === "accepted_job";
              const availabilityLoaded = availableJobIds.size > 0;
              const isPickedByOther = availabilityLoaded && !isAvailable && !isAcceptedByYou;
              const statusLabel = isAvailable
                ? "Still available"
                : isAcceptedByYou
                  ? "You've accepted this job"
                  : "Someone else picked this one up";
              const cardClass = `recent-activity-card${isPickedByOther ? " unavailable" : ""}`;

              return (
              <div
                key={`${activity.jobId}-${activity.viewedAt}`}
                className={cardClass}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/jobDetails/${activity.jobId}`, {
                    state: {
                      fromPath: location.pathname,
                      recentAvailability: isPickedByOther ? "picked_by_other" : "available",
                      recentActivity: activity,
                    },
                  })
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  navigate(`/jobDetails/${activity.jobId}`, {
                    state: {
                      fromPath: location.pathname,
                      recentAvailability: isPickedByOther ? "picked_by_other" : "available",
                      recentActivity: activity,
                    },
                  })
                }
              >
                <div className="recent-activity-top-row">
                  <p className="recent-activity-title" title={activity.title}>
                    {activity.title}
                  </p>
                  {activity.budget ? (
                    <span className="recent-activity-budget">{activity.budget}</span>
                  ) : null}
                </div>
                <p className="recent-activity-time">{getActivityPrimaryText(activity)}</p>
                {activity.location || activity.category ? (
                  <span className="recent-activity-chip">
                    {activity.location ?? activity.category}
                  </span>
                ) : null}
                <span
                  className={`recent-activity-availability${isPickedByOther ? " unavailable" : ""}`}
                >
                  {statusLabel}
                </span>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="recent-activities-empty">No recent activities</div>
        )}
      </main>
    </div>
  );
};

export default RecentActivities;
