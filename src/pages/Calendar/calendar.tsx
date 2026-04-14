import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./calendar.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
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
    const dates = [];

    // empty slots before month starts
    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }

    // actual days
    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(d);
    }

    return dates;
  }, [daysInMonth, firstDayIndex]);

  const handlePrevious = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="calendar-wrapper">
      {/* Sidebar overlay + drawer (same pattern as other pages) */}
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

      {/* Header with hamburger (three-line) button like YourJobs */}
      <header className="requests-header">
        <div className="requests-header-inner">
          <button
            className="requests-menu-btn"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <h1 className="requests-page-title">Calendar</h1>
        </div>
        <hr className="requests-header-divider" />
      </header>

      <main className="calendar-main">
        <div className="calendar-page">
          <div className="calendar-header-controls">
            <button className="nav-button" onClick={handlePrevious}>&lt;</button>
            <h1 className="calendar-title">{monthNames[currentMonth]} {currentYear}</h1>
            <button className="nav-button" onClick={handleNext}>&gt;</button>
          </div>

          {/* Calendar content */}
          <div className="calendar-content">
            <div className="calendar-column">
              {/* Days of week */}
              <div className="calendar-grid calendar-week-header">
                {DAYS.map((day) => (
                  <div key={day} className="calendar-cell header">
                    {day}
                  </div>
                ))}
              </div>

              {/* Dates */}
              <div className="calendar-grid">
                {datesArray.map((date, index) => (
                  <div key={index} className="calendar-cell">
                    {date ?? ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend placed outside the calendar card, to the right */}
        <aside className="calendar-legend-outside">
          <div className="legend-item">
            <span className="pill pill-yellow" />
            <span>Items with yellow pills are your jobs</span>
          </div>
          <div className="legend-items">
            <span className="pill pill-blue" />
            <span style={{marginLeft: '10px'}}>Items with blue pills are your requests</span>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Calendar;