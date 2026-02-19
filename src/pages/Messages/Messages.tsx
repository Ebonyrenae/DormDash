import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import MenuButton from '../../components/ui/MenuButton';
import '../NotFound/notfound.css';
import './messages.css';

const Messages = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="messages-page">
      {/* Keep sidebar navigation working */}
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Under Construction content, styled like Not Found */}
      <div className="notfound-page">
        <div className="notfound-content">
          <h1 className="notfound-title">🚧</h1>
          <h2 className="notfound-subtitle">Messages Under Construction</h2>
          <p className="notfound-description">
            Messaging between students is on the way. You&apos;ll soon be able to chat directly
            about jobs and requests.
          </p>
          <div className="notfound-buttons">
            <button
              className="notfound-btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
            <button
              className="notfound-btn-secondary"
              onClick={() => navigate('/jobs')}
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

