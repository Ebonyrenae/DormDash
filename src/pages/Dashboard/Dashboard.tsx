import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import MenuButton from '../../components/ui/MenuButton';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const recentJobs = [
    {
      id: 1,
      title: 'Help with React Assignment',
      category: 'Programming',
      location: 'Remote',
      time: '2 hours ago',
      price: '$25',
      author: 'Sarah M.',
      active: true
    },
    {
      id: 2,
      title: 'Calculus Tutoring Needed',
      category: 'Tutoring',
      location: 'Library',
      time: '5 hours ago',
      price: '$30/hr',
      author: 'Mike P.',
      active: true
    },
    {
      id: 3,
      title: 'Graphic Design for Flyer',
      category: 'Design',
      location: 'Remote',
      time: '1 day ago',
      price: '$40',
      author: 'Emma L.',
      active: true
    }
  ];

  return (
    <div className="dashboard-page">
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-logo" onClick={() => navigate('/dashboard')}>
            🏃‍💨 DormDash
          </div>
          <nav className="header-nav">
            <button className="nav-item" onClick={() => navigate('/jobs')}>Browse Jobs</button>
            <button className="nav-item" onClick={() => navigate('/my-requests')}>My Requests</button>
            <button className="nav-item profile-btn" onClick={() => navigate('/settings')}>Profile</button>
          </nav>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome back! 👋</h1>
          <p className="welcome-subtitle">Ready to help fellow students or find the help you need?</p>
          
          <div className="stats-row">
            <div className="stat-card stat-blue">
              <div className="stat-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M 3.33333 3.33333 L 16.6667 3.33333 L 16.6667 16.6667 L 3.33333 16.6667 L 3.33333 3.33333 Z" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 6.66667 3.33333 L 6.66667 16.6667" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 3.33333 10 L 16.6667 10" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 6.66667 6.66667 L 13.3333 6.66667" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 6.66667 13.3333 L 13.3333 13.3333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-value">127</div>
                <div className="stat-label">Active Jobs</div>
              </div>
            </div>

            <div className="stat-card stat-green">
              <div className="stat-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M 10 1.66667 L 10 18.3333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 1.66667 10 L 18.3333 10" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-value">$2,450</div>
                <div className="stat-label">You've Earned</div>
              </div>
            </div>

            <div className="stat-card stat-purple">
              <div className="stat-icon">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M 10 1.66667 C 14.6024 1.66667 18.3333 5.39763 18.3333 10 C 18.3333 14.6024 14.6024 18.3333 10 18.3333 C 5.39763 18.3333 1.66667 14.6024 1.66667 10 C 1.66667 5.39763 5.39763 1.66667 10 1.66667 Z" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 10 5 L 10 10 L 13.3333 13.3333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-value">32</div>
                <div className="stat-label">Jobs Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon action-icon-blue">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M 3.33333 3.33333 L 16.6667 3.33333 L 16.6667 16.6667 L 3.33333 16.6667 L 3.33333 3.33333 Z" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 6.66667 3.33333 L 6.66667 16.6667" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 3.33333 10 L 16.6667 10" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 6.66667 6.66667 L 13.3333 6.66667" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 6.66667 13.3333 L 13.3333 13.3333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="action-title">View All Jobs</h3>
              <p className="action-description">Browse available jobs and find opportunities to earn money</p>
              <button className="action-link" onClick={() => navigate('/jobs')}>Explore jobs</button>
            </div>

            <div className="action-card">
              <div className="action-icon action-icon-green">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M 10 1.66667 L 10 18.3333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 1.66667 10 L 18.3333 10" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="action-title">Post a Job</h3>
              <p className="action-description">Need help? Create a job request and get offers from students</p>
              <button className="action-link" onClick={() => navigate('/post-job')}>Create request</button>
            </div>

            <div className="action-card">
              <div className="action-icon action-icon-purple">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M 10 1.66667 C 14.6024 1.66667 18.3333 5.39763 18.3333 10 C 18.3333 14.6024 14.6024 18.3333 10 18.3333 C 5.39763 18.3333 1.66667 14.6024 1.66667 10 C 1.66667 5.39763 5.39763 1.66667 10 1.66667 Z" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 10 5 L 10 10 L 13.3333 13.3333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="action-title">My Requests</h3>
              <p className="action-description">Track your posted jobs and manage ongoing requests</p>
              <button className="action-link" onClick={() => navigate('/my-requests')}>View requests</button>
            </div>
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="recent-jobs-section">
          <div className="section-header">
            <h2 className="section-title">Recent Jobs</h2>
            <button className="view-all-link" onClick={() => navigate('/jobs')}>View all</button>
          </div>
          
          <div className="jobs-list">
            {recentJobs.map((job) => (
              <div key={job.id} className="job-item">
                <div className="job-main">
                  <div className="job-header">
                    <h3 className="job-title">{job.title}</h3>
                    {job.active && <span className="active-badge">active</span>}
                  </div>
                  <div className="job-meta">
                    <span className="meta-item">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M 3.33333 3.33333 L 13.3333 3.33333 L 13.3333 13.3333 L 3.33333 13.3333 L 3.33333 3.33333 Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M 6.66667 3.33333 L 6.66667 13.3333" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {job.category}
                    </span>
                    <span className="meta-item">
                      <svg viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.33" />
                        <path d="M8 2L8 4M8 12L8 14M2 8L4 8M12 8L14 8" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="meta-item">
                      <svg viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.33" />
                        <path d="M 8 4 L 8 8 L 11 11" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
                      </svg>
                      {job.time}
                    </span>
                  </div>
                </div>
                <div className="job-right">
                  <div className="job-price">{job.price}</div>
                  <div className="job-author">by {job.author}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
