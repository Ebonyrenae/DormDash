import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import "./notifications.css";

type NotificationItem = {
  id: number;
  type: string;
  actor_user_id?: number | null;
  job_id: number | null;
  message: string;
  is_read: number | string;
  created_at: string;
};

export default function Notifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unread = useMemo(
    () =>
      items.filter((n) => String(n.is_read) === "0" || n.is_read === 0).length,
    [items],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/notifications.php`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Failed to load notifications.");
          setItems([]);
          setUnreadCount(0);
          return;
        }
        setItems((data.notifications || []) as NotificationItem[]);
        setUnreadCount(Number(data.unreadCount || 0));
      } catch {
        setError("Network error loading notifications.");
        setItems([]);
        setUnreadCount(0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const markAllRead = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications_mark_all_read.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not mark as read.");
        return;
      }
      setItems((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
      setUnreadCount(0);
    } catch {
      setError("Network error marking notifications as read.");
    }
  };

  return (
    <div className="notif-page">
      <header className="notif-header">
        <button className="notif-back" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="notif-title-wrap">
          <h1 className="notif-title">Notifications</h1>
          <p className="notif-subtitle">
            {loading ? "Loading…" : `${unreadCount || unread} unread`}
          </p>
        </div>
        <button
          className="notif-mark"
          onClick={() => void markAllRead()}
          disabled={loading || (unreadCount || unread) === 0}
        >
          Mark all read
        </button>
      </header>

      <main className="notif-main">
        {error && (
          <p className="notif-error" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p className="notif-empty">Loading notifications…</p>
        ) : items.length === 0 ? (
          <p className="notif-empty">No notifications yet.</p>
        ) : (
          <div className="notif-list">
            {items.map((n) => (
              <button
                key={n.id}
                className={`notif-item${
                  String(n.is_read) === "0" || n.is_read === 0
                    ? " notif-unread"
                    : ""
                }`}
                onClick={() => {
                  if (n.job_id) navigate(`/Jobdetails/${n.job_id}`);
                }}
                type="button"
              >
                <div className="notif-item-top">
                  <span className="notif-message">{n.message}</span>
                  <span className="notif-time">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="notif-meta-row">
                  {n.actor_user_id ? (
                    <button
                      type="button"
                      className="notif-inline-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/messages/${n.actor_user_id}`);
                      }}
                    >
                      Message
                    </button>
                  ) : null}
                  {n.job_id ? (
                    <span className="notif-meta">Open job</span>
                  ) : (
                    <span className="notif-meta"> </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

