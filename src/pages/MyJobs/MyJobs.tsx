import { useState } from 'react';
import BottomNav from '../../components/layout/BottomNav';
import JobCard from '../../components/ui/JobCard';
import { myJobsData } from '../../data/jobs';
import './myjobs.css';

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  // Filter jobs by status
  const activeJobs = myJobsData.filter((job) => job.status === 'in-progress');
  const completedJobs = myJobsData.filter((job) => job.status === 'completed');

  const displayJobs = activeTab === 'active' ? activeJobs : completedJobs;

  return (
    <div className="myjobs-page">
      {/* Header */}
      <header className="myjobs-header">
        <h1>My Jobs</h1>
        <p>Track your active and completed jobs</p>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({activeJobs.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completedJobs.length})
        </button>
      </div>

      {/* Jobs List */}
      <main className="myjobs-content">
        {displayJobs.length > 0 ? (
          <div className="jobs-list">
            {displayJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showStatus={true}
                onAction={(id) => alert(`View details for job ${id}`)}
                actionLabel={activeTab === 'active' ? 'View Details' : 'View Receipt'}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No {activeTab} jobs</h3>
            <p>
              {activeTab === 'active'
                ? "You don't have any jobs in progress. Browse available jobs to get started!"
                : "You haven't completed any jobs yet. Keep working to build your history!"}
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MyJobs;
