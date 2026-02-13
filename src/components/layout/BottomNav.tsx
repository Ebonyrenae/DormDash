import { useNavigate, useLocation } from 'react-router-dom';
import './bottomnav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path matches nav item
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${isActive('/home') ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </button>

      <button
        className={`nav-item ${isActive('/jobs') ? 'active' : ''}`}
        onClick={() => navigate('/jobs')}
      >
        <span className="nav-icon">💼</span>
        <span className="nav-label">Jobs</span>
      </button>

      <button
        className={`nav-item ${isActive('/my-jobs') ? 'active' : ''}`}
        onClick={() => navigate('/my-jobs')}
      >
        <span className="nav-icon">📋</span>
        <span className="nav-label">My Jobs</span>
      </button>

      <button
        className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
        onClick={() => navigate('/settings')}
      >
        <span className="nav-icon">⚙️</span>
        <span className="nav-label">Settings</span>
      </button>
    </nav>
  );
};

export default BottomNav;
