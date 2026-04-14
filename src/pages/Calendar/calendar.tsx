import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./calendar.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarItem = {
  id: number;
  type: "request" | "accepted";
  title: string;
  date: string;
};

const API_BASE_URL =
  "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api";

const normalizeDate = (d: string) => d?.split(" ")[0];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<CalendarItem[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const SIDEBAR_LINKS = [
    { label: "Home", path: "/dashboard" },
    { label: "View Jobs", path: "/all-jobs" },
    { label: "Post a Job", path: "/post-job" },
    { label: "Your Jobs", path: "/your-jobs" },
    { label: "Profile", path: "/profile" },
    { label: "Messages", path: "/messages" },
    { label: "Settings", path: "/settings" },
  ];

  const fetchCalendarItems = async () => {
    try {
      const [requestsRes, acceptedRes] = await Promise.all([
        fetch(`${API_BASE_URL}/get_my_jobs.php`, {
          credentials: "include",
        }),
        fetch(`${API_BASE_URL}/get_accepted_jobs.php`, {
          credentials: "include",
        }),
      ]);

      const requestsData = await requestsRes.json();
      const acceptedData = await acceptedRes.json();

      if (!requestsData.success || !acceptedData.success) {
        console.error("Failed to load calendar data");
        return [];
      }

      const requests = requestsData.jobs ?? [];
      const accepted = acceptedData.jobs ?? [];

const filteredAccepted = accepted.filter(
  (a: any) =>
    a.status === "active" ||
    a.status === "in_progress"
);

      const allItems: CalendarItem[] = [
        ...requests.map((r: any) => ({
          id: r.id,
          title: r.title,
          date: r.job_date,
          type: "request" as const,
        })),
        ...filteredAccepted.map((a: any) => ({
          id: a.id,
          title: a.title,
          date: a.job_date,
          type: "accepted" as const,
        })),
      ];

      return allItems;
    } catch (err) {
      console.error("Calendar fetch error:", err);
      return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchCalendarItems();
      setItems(data);
    };
    load();
  }, []);

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname !== path) navigate(path);
  };

  const { daysInMonth, firstDayIndex } = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    return {
      daysInMonth: lastDay.getDate(),
      firstDayIndex: firstDay.getDay(),
    };
  }, [currentMonth, currentYear]);

  const datesArray = useMemo(() => {
    const dates: (number | null)[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(d);
    }

    return dates;
  }, [daysInMonth, firstDayIndex]);

  // 🔥 PERFORMANCE OPTIMIZATION: index items by date
  const itemsByDate = useMemo(() => {
    const map: Record<string, CalendarItem[]> = {};

    for (const item of items) {
      const key = normalizeDate(item.date);
      if (!map[key]) map[key] = [];
      map[key].push(item);
    }

    return map;
  }, [items]);

  const handlePrevious = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar-wrapper">
      {/* Sidebar */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`sidebar-drawer${sidebarOpen ? " open" : ""}`}
      >
        <nav className="sidebar-nav">
          {SIDEBAR_LINKS.map((link) => (
            <button
              key={link.path}
              className={`sidebar-link${
                location.pathname === link.path ? " active" : ""
              }`}
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
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <h1 className="requests-page-title">Task Schedule</h1>
        </div>
        <hr />
      </header>

      {/* Description */}
      

      {/* Calendar */}
      <main className="calendar-main">
        <div className="calendar-page">
          <div className="calendar-header-controls">
            <button className="nav-button" onClick={handlePrevious}>&lt;</button>
            <h1 className="calendar-header-title" style={{fontSize: '18px'}}>
              {monthNames[currentMonth]} {currentYear}
            </h1>
            <button className="nav-button" onClick={handleNext}>&gt;</button>
          </div>

          <div className="calendar-grid calendar-week-header">
            {DAYS.map((d) => (
              <div key={d} className="calendar-cell header">
                {d}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {datesArray.map((date, index) => {
              const formattedDate =
                date !== null
                  ? `${currentYear}-${String(
                      currentMonth + 1
                    ).padStart(2, "0")}-${String(date).padStart(
                      2,
                      "0"
                    )}`
                  : null;

              const dayItems =
                itemsByDate[formattedDate || ""] || [];

              return (
                <div key={index} className="calendar-cell">
                  {date && (
                    <span className="calendar-date">{date}</span>
                  )}

                  <div className="calendar-pills">
                    {dayItems.map((item) => (
                      <div
                        key={item.id}
                        className={`pill ${
                          item.type === "accepted"
                            ? "pill-yellow"
                            : "pill-blue"
                        }`}
                        onClick={() =>
                          navigate(`/my-request/${item.id}`)
                        }
                        title={item.title}
                      >
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        

          {/* Legend */}
          <aside className="calendar-legend-outside">
            <div className="legend-item" style={{fontSize: '16px', fontWeight: "bold"}}>Track your jobs and requests!
</div>
            <div className="legend-item">
              <span className="pill pill-yellow" />
            <span>Items with yellow pills are your jobs</span>

            </div>

            <div className="legend-item">
              <span className="pill pill-blue" />
                          <span>Items with blue pills are your requests</span>

            </div>
          </aside>
      </main>
    </div>
  );
};

export default Calendar;