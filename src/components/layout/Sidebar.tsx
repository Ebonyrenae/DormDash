import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>

        <div className="sidebar-header" style ={{ display: 'flex', gap: '10px', marginBottom: '40px', marginLeft: '-10px' }}>
          <strong style ={{ color: '#29AC3D', fontSize: '32px', textAlign: 'left', display: 'flex',  }}>Menu</strong>
          <button className="close-btn" style={{fontSize: "32px"}} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p 
          className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => handleNavigate('/dashboard')}
        >
          Home
        </p>
        <p 
          className={`sidebar-link ${location.pathname === '/jobs' ? 'active' : ''}`}
          onClick={() => handleNavigate('/jobs')}
        >
          View Jobs
        </p>
        <p 
          className={`sidebar-link ${location.pathname === '/post-job' ? 'active' : ''}`}
          onClick={() => handleNavigate('/post-job')}
        >
          Post a Job
        </p>

        <p className={`sidebar-link ${location.pathname === '/requests' ? 'active' : ''}`}
          onClick={() => handleNavigate('/my-requests')}
        >
          My Requests
        </p>
        <p 
          className={`sidebar-link ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => handleNavigate('/profile')}
        >
          Profile
        </p>
        <p 
          className={`sidebar-link ${location.pathname === '/messages' ? 'active' : ''}`}
          onClick={() => handleNavigate('/messages')}
        >
          Messages
        </p>
        <p 
          className={`sidebar-link ${location.pathname === '/settings' ? 'active' : ''}`}
          onClick={() => handleNavigate('/settings')}
        >
          Settings
        </p>
      </aside>
    </>
  );
};

export default Sidebar;
