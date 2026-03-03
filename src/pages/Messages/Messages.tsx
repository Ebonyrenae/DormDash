import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./messages.css";

interface Conversation {
  id: string;
  initials: string;
  name: string;
  role: "Helper" | "Rider";
  subject: string;
  preview: string;
  time: string;
  unread?: number;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    initials: "MJ",
    name: "Mike Johnson",
    role: "Helper",
    subject: "Re: Ride to Airport",
    preview: "I can pick you up at 2pm!",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    initials: "SW",
    name: "Sarah Williams",
    role: "Rider",
    subject: "Re: Grocery Shopping Help",
    preview: "Thank you so much! See you then",
    time: "1h ago",
  },
  {
    id: "3",
    initials: "AC",
    name: "Alex Chen",
    role: "Helper",
    subject: "Re: Lunch Pickup",
    preview: "I'll be there in 10 minutes",
    time: "3d ago",
  },
  {
    id: "4",
    initials: "ED",
    name: "Emily Davis",
    role: "Rider",
    subject: "Re: walmart pickup",
    preview: "hey are you here yet?",
    time: "1w ago",
    unread: 1,
  },
];

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Profile", path: "/profile/me" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="11"
      cy="11"
      r="8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const filtered = CONVERSATIONS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="messages-page">
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
      <header className="messages-header">
        <button
          className="messages-menu-btn"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="messages-page-title">Messages</h1>
      </header>

      {/* Main */}
      <main className="messages-main">
        <div className="messages-container">
          {/* ── Left panel ── */}
          <div className="messages-left">
            {/* Search */}
            <div className="messages-search-wrap">
              <div className="messages-search-inner">
                <SearchIcon />
                <input
                  type="text"
                  className="messages-search-input"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Conversation list */}
            <div className="messages-conv-list">
              {filtered.map((conv) => (
                <div
                  key={conv.id}
                  className={`conv-item${selectedId === conv.id ? " active-conv" : ""}`}
                  onClick={() => setSelectedId(conv.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedId(conv.id)}
                >
                  {/* Avatar */}
                  <div className="conv-avatar">{conv.initials}</div>

                  {/* Body */}
                  <div className="conv-body">
                    <div className="conv-name-row">
                      <span className="conv-name">{conv.name}</span>
                      <span
                        className={`conv-role-badge ${conv.role.toLowerCase()}`}
                      >
                        {conv.role}
                      </span>
                    </div>
                    <span className="conv-subject">{conv.subject}</span>
                    <span className="conv-preview">{conv.preview}</span>
                  </div>

                  {/* Right: time + unread */}
                  <div className="conv-right">
                    <span className="conv-time">{conv.time}</span>
                    {conv.unread && (
                      <span className="conv-unread">{conv.unread}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="messages-right">
            <div className="messages-empty-state">
              <div className="messages-empty-icon">
                <PersonIcon />
              </div>
              <p className="messages-empty-text">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
