import { Job } from '../../data/jobs';
import './jobcard.css';

interface JobCardProps {
  job: Job;
  onAction?: (jobId: string) => void;
  actionLabel?: string;
  showStatus?: boolean;
}

const JobCard = ({ job, onAction, actionLabel = 'View Details', showStatus = false }: JobCardProps) => {
  // Get category badge color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      delivery: '#10b981',
      cleaning: '#f59e0b',
      tutoring: '#6366f1',
      moving: '#ef4444',
      other: '#6b7280',
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-title-row">
          <h3 className="job-title">{job.title}</h3>
          {showStatus && job.status && (
            <span className={`status-badge status-${job.status}`}>
              {job.status === 'in-progress' ? 'In Progress' : job.status}
            </span>
          )}
        </div>
        <span
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(job.category) }}
        >
          {job.category}
        </span>
      </div>

      <div className="job-info">
        <div className="info-row">
          <span className="info-icon">📍</span>
          <span className="info-text">{job.location} - {job.building}</span>
        </div>
        <div className="info-row">
          <span className="info-icon">💰</span>
          <span className="info-text">{job.payRate}</span>
        </div>
        <div className="info-row">
          <span className="info-icon">⏱️</span>
          <span className="info-text">{job.duration}</span>
        </div>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-footer">
        <div className="job-meta">
          <span className="posted-by">Posted by {job.postedBy}</span>
          <span className="posted-date">{job.postedDate}</span>
        </div>
        {onAction && (
          <button className="action-button" onClick={() => onAction(job.id)}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
