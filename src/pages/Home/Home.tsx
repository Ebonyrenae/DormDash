import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/layout/BottomNav';
import JobCard from '../../components/ui/JobCard';
import { jobsData } from '../../data/jobs';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  // Get recent jobs (first 3)
  const recentJobs = jobsData.slice(0, 3);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-top">
          <h1>DormDash</h1>
          <button className="profile-button" onClick={() => navigate('/settings')}>
            👤
          </button>
        </div>
        <p className="welcome-text">Welcome back! Ready to earn?</p>
      </header>

      {/* Main Content */}
      <main className="home-content">
        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate('/jobs')}>
              <span className="action-icon">🔍</span>
              <span className="action-label">Browse Jobs</span>
            </button>
            <button className="action-card">
              <span className="action-icon">➕</span>
              <span className="action-label">Post a Job</span>
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <span className="stat-value">12</span>
            <span className="stat-label">Jobs Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">$240</span>
            <span className="stat-label">Total Earned</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">4.8</span>
            <span className="stat-label">Rating</span>
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="recent-jobs">
          <div className="section-header">
            <h2>Available Jobs Near You</h2>
            <button className="see-all-link" onClick={() => navigate('/jobs')}>
              See All →
            </button>
          </div>
          <div className="jobs-list">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onAction={() => navigate('/jobs')}
                actionLabel="Apply Now"
              />
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
