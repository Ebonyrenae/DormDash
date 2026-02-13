import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MenuButton from '../../components/ui/MenuButton';
import './myrequests.css';

const MyRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const requests = [
    {
      id: 1,
      title: 'Help with React Assignment',
      description: 'Need someone to help debug my React app and explain component lifecycle hooks.',
      status: 'active',
      price: '$25',
      postedTime: '2 hours ago',
      location: 'Remote',
      applications: 5,
      messages: 3
    }
  ];

  return (
    <div className="my-requests-page">
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Header */}
      <header className="requests-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/dashboard')}>
            🏃‍💨 DormDash
          </div>
          <div className="header-nav">
            <button className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="nav-btn" onClick={() => navigate('/post-job')}>Post a Job</button>
          </div>
        </div>
      </header>

      <div className="my-requests-content">
        {/* Stats Card */}
        <div className="stats-card">
          <h1 className="stats-title">My Requests</h1>
          
          <div className="stats-grid">
            <div className="stat-box stat-total">
              <div className="stat-label">Total Requests</div>
              <div className="stat-number">4</div>
            </div>

            <div className="stat-box stat-active">
              <div className="stat-label">Active</div>
              <div className="stat-number">1</div>
            </div>

            <div className="stat-box stat-progress">
              <div className="stat-label">In Progress</div>
              <div className="stat-number">1</div>
            </div>

            <div className="stat-box stat-completed">
              <div className="stat-label">Completed</div>
              <div className="stat-number">1</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active (1)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            In Progress (1)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed (1)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All (4)
          </button>
        </div>

        {/* Request Card */}
        <div className="request-card">
          <div className="request-header">
            <div className="request-title-row">
              <h3 className="request-title">Help with React Assignment</h3>
              <span className="status-badge status-active">
                <svg viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#1447E6" strokeWidth="1.17" />
                  <path d="M7 4.66V7" stroke="#1447E6" strokeWidth="1.17" strokeLinecap="round" />
                  <path d="M7 9.33H7.006" stroke="#1447E6" strokeWidth="1.17" strokeLinecap="round" />
                </svg>
                Active
              </span>
            </div>
            <div className="request-price">$25</div>
          </div>

          <p className="request-description">
            Need someone to help debug my React app and explain component lifecycle hooks.
          </p>

          <div className="request-meta">
            <div className="meta-item">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M7.99918 11.3319 L 7.99918 13.3319 L 13.3325 8.66517 L 13.3325 6.66517 L 7.99918 1.99849 L 7.99918 3.99849" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 4.66594 8.66517 L 2.66594 8.66517" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Posted 2 hours ago</span>
            </div>

            <div className="meta-item">
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="7.66" r="5.67" stroke="#4A5565" strokeWidth="1.33" />
                <path d="M 7.99914 5.33183 L 7.99914 7.66516 L 10.3325 7.66516" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Remote</span>
            </div>

            <div className="meta-item">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M 5.33253 5.33183 C 5.33253 6.30418 5.71878 7.23672 6.40641 7.92435 C 7.09405 8.61199 8.02658 8.99824 8.99893 8.99824 C 9.97127 8.99824 10.9038 8.61199 11.5914 7.92435 C 12.2791 7.23672 12.6653 6.30418 12.6653 5.33183" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 5.3325 5.33183 L 5.3325 5.3385" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>5 applications</span>
            </div>

            <div className="meta-item">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M 13.9991 1.33174 L 7.99912 7.33174 M 7.99912 7.33174 L 1.99912 13.3317 M 7.99912 7.33174 L 1.99912 1.33174 M 7.99912 7.33174 L 13.9991 13.3317" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>3 messages</span>
            </div>
          </div>

          <div className="request-actions">
            <button className="action-btn action-primary">
              View Applications (5)
            </button>
            <button className="action-btn action-secondary">
              Edit
            </button>
            <button className="action-btn action-danger">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
