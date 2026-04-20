import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../config";
import {
  getActivityPrimaryText,
  getDashboardRecentActivitiesForUser,
  type RecentActivityItem,
} from "../../utils/recentActivities";
import "./dashboard.css";
import "../JobDetailsPage/jobdetails.css";

interface Job {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  time: string;
}

const SERVICE_EMOJI: Record<string, string> = {
  rides: "🚗",
  groceries: "🛒",
  cleaning: "🧼",
  tutoring: "📚",
  handyman: "🧑‍🔧",
  cooking: "👨‍🍳",
  moving: "🚛",
};

const getServiceEmoji = (serviceType?: string | null) => {
  if (!serviceType) return "🛠️";
  return SERVICE_EMOJI[serviceType.toLowerCase()] ?? "🛠️";
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



const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="8"
      y1="2"
      x2="8"
      y2="6"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="16"
      y1="2"
      x2="16"
      y2="6"
      stroke="currentColor"
      strokeWidth="1.5"
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
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [notificationsUnread, setNotificationsUnread] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const seenNotificationIds = useRef<Set<number>>(new Set());
  const [acceptedJobs, setAcceptedJobs] = useState<any[]>([]);

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

        const jobs = (data.jobs as any[]).map((job) => ({
          id: String(job.id),
          title: job.title ?? "",
          description: job.description ?? "",
          price: Number(job.budget ?? job.price ?? 0) || 0,
          location: job.location ?? "",
          time: (job.job_time ?? job.time ?? "").slice(0, 5),
        }));

        setAvailableJobIds(new Set(jobs.map((job) => job.id)));
        setAvailableJobs(jobs);
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

  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      try {
        const userId = localStorage.getItem("userId") || localStorage.getItem("user_id");
        const res = await fetch(`${API_BASE}/get_accepted_jobs.php?user_id=${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log('Accepted jobs response:', data);
        if (data.success && Array.isArray(data.jobs)) {
          const normalized = (data.jobs as any[])
            .map((job) => {
              const dateStr = job.date ?? job.job_date ?? job.jobDate ?? null;
              const timeStr = job.time ?? job.job_time ?? job.jobTime ?? null;
              const budget = job.budget ?? job.price ?? job.amount ?? null;
              const rawStatus = job.status ?? job.job_status ?? job.status_name ?? job.state ?? '';
              const statusStr = String(rawStatus).toLowerCase();
              const isActiveOrInProgress = statusStr === 'active' || statusStr === 'in_progress' || statusStr === '1' || statusStr === 'true' || rawStatus === 1;

              return {
                ...job,
                job_date: dateStr,
                job_time: timeStr,
                date: dateStr,
                time: timeStr,
                budget,
                normalizedStatus: statusStr,
                _isActiveOrInProgress: isActiveOrInProgress,
              };
            })
            .filter((j) => j._isActiveOrInProgress);

          console.log('normalized jobs:', normalized.map(j => ({ id: j.id, rawStatus: j.status, normalizedStatus: j.normalizedStatus, _isActiveOrInProgress: j._isActiveOrInProgress, date: j.job_date })));
          console.log('filtered acceptedJobs:', normalized.map(j => ({ id: j.id, normalizedStatus: j.normalizedStatus, date: j.job_date })));
          setAcceptedJobs(normalized);
        }
      } catch (error) {
        console.error('Error fetching accepted jobs:', error);
      }
    };

    fetchAcceptedJobs();
  } , []);

  const nextJob = useMemo(() => {
    if (!acceptedJobs.length) return [] as any[];
    const now = new Date();
    
    // Separate in-progress and active jobs
    const inProgressJobs = acceptedJobs.filter(job => job.normalizedStatus === 'in_progress');
    const activeJobs: any[] = [];

    console.log('acceptedJobs:', acceptedJobs.map(j => ({ id: j.id, status: j.normalizedStatus, date: j.job_date, time: j.job_time })));
    console.log('inProgressJobs count:', inProgressJobs.length);

    // For active jobs, only include upcoming ones (dateTime > now)
    for (const job of acceptedJobs) {
      if (job.normalizedStatus === 'active') {
        const dateStr = job.date ?? job.job_date ?? job.jobDate ?? null;
        const timeStr = job.time ?? job.job_time ?? job.jobTime ?? null;
        let dateTime: Date | null = null;
        if (dateStr) {
          try {
            dateTime = timeStr ? new Date(`${dateStr}T${timeStr}`) : new Date(dateStr);
            if (isNaN(dateTime.getTime())) dateTime = null;
          } catch {
            dateTime = null;
          }
        }

        console.log('active job:', job.id, 'dateStr:', dateStr, 'timeStr:', timeStr, 'dateTime:', dateTime, 'now:', now, 'isFuture:', dateTime ? dateTime > now : false);

        if (dateTime && dateTime > now) {
          activeJobs.push({ ...job, dateTime });
        }
      }
    }

    // Sort active jobs by earliest time (jobs without dateTime at the end)
    activeJobs.sort((a, b) => {
      if (!a.dateTime && !b.dateTime) return 0;
      if (!a.dateTime) return 1;
      if (!b.dateTime) return -1;
      return a.dateTime.getTime() - b.dateTime.getTime();
    });

    console.log('activeJobs after sort:', activeJobs.map(j => ({ id: j.id, dateTime: j.dateTime })));

    // Combine: all in-progress jobs first, then up to (3 - inProgressJobs.length) active jobs
    const result = [
      ...inProgressJobs,
      ...activeJobs.slice(0, Math.max(0, 3 - inProgressJobs.length))
    ];

    console.log('final result:', result.map(j => ({ id: j.id, status: j.normalizedStatus })));

    return result.slice(0, 3);
  }, [acceptedJobs]);

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
            className="nav-calendar"
            onClick={() => navigate("/calendar")}
            aria-label="Open calendar"
            title="Calendar"
          >
            <CalendarIcon />
          </button>
                      

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

        <div className="dashboard-grid">

        <section style={{marginBottom: '80px'}}> 
          <div className= "next-job-section" style={{marginBottom: '8px'}}>
          <h2 className="section-heading" style={{marginBottom: "20px", color: "#e2c12b", fontSize: "1.5rem"}}>Your Upcoming Jobs</h2>
          <h2 className="section-subheading" style={{marginBottom: "0px", color: "#666", fontSize: "14px"}}>You have started this job(s). Mark as complete once done.</h2>
          </div>
          <div className="jobs-list">
            {nextJob && nextJob.length > 0 ? (
              (() => {
                let hasShownActiveText = false;
                return nextJob.map((job) => (
                  <div key={job.id}>
                    {job.normalizedStatus === 'active' && !hasShownActiveText ? (
                      <p style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                        These are your upcoming jobs. You have yet to start them.
                      </p>
                    ) : null}
                    {job.normalizedStatus === 'active' && !hasShownActiveText ? (() => { hasShownActiveText = true; return null; })() : null}
                    {job.normalizedStatus === 'in_progress' ? (
                      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid #ebc943', marginBottom: '16px' }}>
                          <div className="request-card-top">

                            <div style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontFamily: 'Inter', color: '#374151' }}>
                              {job.service_type ? `${getServiceEmoji(job.service_type)} ${job.service_type}` : `${getServiceEmoji(null)} Other`}
                            </div>
                            <span style={{ backgroundColor: '#faf2d2', color: '#a16207', borderRadius: '999px', padding: '6px 12px', fontSize: '12px', fontFamily: 'Inter', fontWeight: 600, textTransform: 'capitalize' }}>
                              {String(job.normalizedStatus ?? 'upcoming').replace(/_/g, ' ')}
                            </span>
                          </div>
                  
                        <h1 style={{ fontSize: '22px', fontFamily: 'Inter', fontWeight: 500, marginBottom: '8px' }}>
                          {job.title ?? 'Untitled'}
                        </h1>
                        <p style={{ fontSize: '14px', fontFamily: 'Inter', color: '#6b7280', marginBottom: '16px', cursor: 'pointer' }} onClick={() => navigate(`/profile/${job.user_id}`)}>
                          Posted by: @{job.username ?? 'User'}
                        </p>
                        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '16px' }} />
                        <p style={{ fontSize: '14px', fontFamily: 'Inter', marginBottom: '24px', fontWeight: 400 }}>
                          {job.description ?? 'No description provided'}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1, padding: '12px', backgroundColor: '#f0ede8', borderRadius: '8px', height: '55px' }}>
                              <p style={{ fontSize: '12px', fontFamily: 'Inter', color: '#6b7280', fontWeight: 500, marginBottom: '4px' }}>Location</p>
                              <p style={{ fontSize: '14px', fontFamily: 'Inter' }}>📍 {job.location ?? 'TBD'}</p>
                            </div>
                            <div style={{ flex: 1, padding: '12px', backgroundColor: '#f0ede8', borderRadius: '8px', height: '55px' }}>
                              <p style={{ fontSize: '12px', fontFamily: 'Inter', color: '#6b7280', fontWeight: 500, marginBottom: '4px' }}>Time</p>
                              <p style={{ fontSize: '14px', fontFamily: 'Inter' }}>🕐 {job.job_time?.slice(0, 5) ?? 'TBD'}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1, padding: '12px', backgroundColor: '#f0ede8', borderRadius: '8px', height: '55px' }}>
                              <p style={{ fontSize: '12px', fontFamily: 'Inter', color: '#6b7280', fontWeight: 500, marginBottom: '4px' }}>Date</p>
                              <p style={{ fontSize: '14px', fontFamily: 'Inter' }}>📅 {job.job_date ?? 'TBD'}</p>
                            </div>
                            <div style={{ flex: 1, padding: '12px', backgroundColor: '#f0ede8', borderRadius: '8px', height: '55px' }}>
                              <p style={{ fontSize: '12px', fontFamily: 'Inter', color: '#6b7280', fontWeight: 500, marginBottom: '4px' }}>Budget</p>
                              <p style={{ fontSize: '14px', fontFamily: 'Inter', color: '#23a542', fontWeight: "bold" }}>💰 ${job.budget ?? 0}</p>
                            </div>
                          </div>
                        </div>
                        {(job.status === 'active' || job.status === 'in_progress') && (
                          <div style={{ fontFamily: 'Inter', marginTop: '24px', padding: '16px 20px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
                            <p>
                              <strong style={{ fontFamily: 'Inter', color: 'green' }}>Meet-up Code: </strong>{job.confirmation_code ?? 'Not available'}
                            </p>
                            <p style={{ fontSize: '12px', fontFamily: 'Inter', color: '#6b7280', marginTop: '4px' }}>
                              Show this code to your client to verify you're meeting the right person
                            </p>
                          </div>
                        )}
                        <div style={{ marginTop: '20px', fontSize: '12px', fontFamily: 'Inter', color: '#6b7280', textAlign: 'center' }}>
                          Need to mark as complete? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/your-jobs')}>Go to Your Jobs</span>
                        </div>
                      </div>
                    ) : (
                      <div className="request-card" style={{ marginBottom: '20px', border: '1px solid #26d229', backgroundColor: '#fff' }} onClick={() => navigate(`/jobDetails/${job.id}`)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/jobDetails/${job.id}`)}>
                        <div className="request-card-top">
                          <div className="category-badge">
                            <span>{job.service_type ? `${getServiceEmoji(job.service_type)} ${job.service_type}` : `${getServiceEmoji(null)} Other`}</span>
                          </div>
                          <span
                            className="status-badge"
                            style={{
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              borderColor: '#bbf7d0',
                              textTransform: 'capitalize',
                            }}
                          >
                            {String(job.normalizedStatus ?? "upcoming").replace("_", " ")}
                          </span>
                        </div>
                        <h3 className="request-card-title">{job.title ?? "Untitled job"}</h3>
                        <p className="request-card-description">
                          {job.description ?? "No description provided"}
                        </p>
                        <div className="request-card-meta">
                          <div className="request-meta-item">
                            <span className="request-meta-key"><ClockIcon /> Date &amp; Time</span>
                            <span className="request-meta-value" style={{ whiteSpace: 'pre-line' }}>
                              {job.job_date ?? job.date ?? 'TBD'}{"\n"}{job.job_time?.slice(0, 5) ?? job.time ?? ''}
                            </span>
                          </div>
                          <div className="request-meta-item">
                            <span className="request-meta-key">
                              <LocationIcon /> Location
                            </span>
                            <span className="request-meta-value">
                              {job.location ?? "TBD"}
                            </span>
                          </div>
                          <div className="request-meta-item">
                            <span className="request-meta-key">Budget</span>
                            <span className="request-meta-value budget-value">
                              ${job.budget ?? 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ));
              })()
            ) : (
              <div className="empty-state">No upcoming jobs. Check out available jobs and pick one!</div>
            )}
          </div>
        </section>
        {/* Two-column grid */}
          {/* Available Jobs 
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
              {availableJobs.length > 0 ? (
                availableJobs.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="job-card"
                    onClick={() => navigate(`/Jobdetails/${job.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && navigate(`/Jobdetails/${job.id}`)
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
          </section> */}

          {/* Recent Activities */}
          <section>
            <div className="section-header">
              <h2 className="section-heading" style={{color: "#105666", fontSize: "1.5rem", marginBottom: "25px"}}>Recent Activities</h2>
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
