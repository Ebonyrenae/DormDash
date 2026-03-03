import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE } from "../config";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

/**
 * Wraps protected pages: checks session via api/me.php (credentials: include).
 * Shows loading until check completes; redirects to /signin if not logged in.
 * Works with createBrowserRouter and basename (e.g. /CSE442/2026-Spring/cse-442i/).
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/me.php`, { credentials: "include" });
        const data = await res.json();
        if (!cancelled) {
          setLoggedIn(Boolean(data.loggedIn));
        }
      } catch {
        if (!cancelled) setLoggedIn(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: "center", fontFamily: "sans-serif" }}>
        Loading…
      </div>
    );
  }

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
