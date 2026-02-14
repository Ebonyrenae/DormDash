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
