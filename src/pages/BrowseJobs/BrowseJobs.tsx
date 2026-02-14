import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MenuButton from '../../components/ui/MenuButton';
import svgPaths from '../../../imports/svg-8hoiwdtthf';
import './browsejobs.css';

const BrowseJobs = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Help with React Assignment',
      description: 'Need someone to help debug my React app and explain component lifecycle hooks.',
      price: '$25',
      tags: ['React', 'JavaScript', 'Debugging'],
      location: 'Remote',
      postedTime: '2 hours ago',
      fixedPrice: true,
      author: {
        name: 'Sarah M.',
        initials: 'SM',
        color: '#6366f1'
      }
    },
    {
      id: 2,
      title: 'Calculus Tutoring Needed',
      description: 'Looking for help with derivatives and integrals. Preparing for midterm exam.',
      price: '$30/hr',
      tags: ['Math', 'Calculus', 'Tutoring'],
      location: 'Library - 3rd Floor',
      postedTime: '5 hours ago',
      hourly: true,
      urgent: true,
      author: {
        name: 'Mike P.',
        initials: 'MP',
        color: '#ec4899'
      }
    },
    {
      id: 3,
      title: 'Graphic Design for Event Flyer',
      description: 'Need a modern flyer design for our club event. Must include logo and event details.',
      price: '$40',
      tags: ['Photoshop', 'Illustrator', 'Design'],
      location: 'Remote',
      postedTime: '1 day ago',
      fixedPrice: true,
      author: {
        name: 'Emma L.',
        initials: 'EL',
        color: '#29ac3d'
      }
    },
    {
      id: 4,
      title: 'Python Data Analysis Project',
      description: 'Help needed with pandas and matplotlib for data visualization project.',
      price: '$50',
      tags: ['Python', 'Pandas', 'Data Analysis'],
      location: 'Remote',
      postedTime: '1 day ago',
      fixedPrice: true,
      author: {
        name: 'Alex K.',
        initials: 'AK',
        color: '#8b5cf6'
      }
    },
    {
      id: 5,
      title: 'Spanish Conversation Practice',
      description: 'Looking for native or fluent Spanish speaker for weekly conversation practice.',
      price: '$20/hr',
      tags: ['Spanish', 'Language', 'Conversation'],
      location: 'Coffee Shop - Campus',
      postedTime: '2 days ago',
      hourly: true,
      author: {
        name: 'Jordan T.',
        initials: 'JT',
        color: '#10b981'
      }
    },
    {
      id: 6,
      title: 'Essay Proofreading & Editing',
      description: 'Need someone to proofread my 10-page research paper and provide feedback.',
      price: '$35',
      tags: ['Writing', 'Editing', 'Proofreading'],
      location: 'Remote',
      postedTime: '3 days ago',
      urgent: true,
      fixedPrice: true,
      author: {
        name: 'Chris W.',
        initials: 'CW',
        color: '#ef4444'
      }
    }
  ];

  return (
    <div className="browse-jobs-page">
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Header */}
      <header className="jobs-header">
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

      <div className="browse-jobs-content">
        {/* Page Header */}
        <div className="page-header-card">
          <h1 className="page-title">Browse All Jobs</h1>
          <p className="page-subtitle">Find opportunities to earn money by helping fellow students</p>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="#99A1AF" strokeWidth="1.5" />
              <path d="M14 14L17 17" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="quick-filters">
            <span className="filter-label">Quick Filters:</span>
            <button className={`filter-chip ${activeFilter === 'urgent' ? 'active' : ''}`} onClick={() => setActiveFilter('urgent')}>
              Urgent
            </button>
            <button className={`filter-chip ${activeFilter === 'remote' ? 'active' : ''}`} onClick={() => setActiveFilter('remote')}>
              Remote Only
            </button>
            <button className={`filter-chip ${activeFilter === 'high-pay' ? 'active' : ''}`} onClick={() => setActiveFilter('high-pay')}>
              High Paying
            </button>
          </div>
        </div>

        {/* Results Bar */}
        <div className="results-bar">
          <p className="results-count">Showing <strong>6 jobs</strong></p>
          <div className="sort-section">
            <span className="sort-label">Sort by:</span>
            <select className="sort-dropdown">
              <option>Most Recent</option>
              <option>Highest Pay</option>
              <option>Closest Location</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header-row">
                <div className="job-title-section">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-badges">
                    {job.fixedPrice && <span className="badge badge-fixed">Fixed Price</span>}
                    {job.hourly && <span className="badge badge-hourly">Hourly</span>}
                    {job.urgent && <span className="badge badge-urgent">URGENT</span>}
                  </div>
                </div>
                <div className="job-price">{job.price}</div>
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-tags">
                {job.tags.map((tag, index) => (
                  <span key={index} className="job-tag">{tag}</span>
                ))}
              </div>

              <div className="job-meta">
                <div className="meta-item">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M7.99918 11.3319 L 7.99918 13.3319 L 13.3325 8.66517 L 13.3325 6.66517 L 7.99918 1.99849 L 7.99918 3.99849" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 4.66594 8.66517 L 2.66594 8.66517" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Programming</span>
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="7.66" r="5.67" stroke="#4A5565" strokeWidth="1.33" />
                    <path d="M 7.99914 5.33183 L 7.99914 7.66516 L 10.3325 7.66516" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{job.location}</span>
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M7.99918 11.3319 L 7.99918 13.3319 L 13.3325 8.66517 L 13.3325 6.66517 L 7.99918 1.99849 L 7.99918 3.99849" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 4.66594 8.66517 L 2.66594 8.66517" stroke="#4A5565" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{job.postedTime}</span>
                </div>
              </div>

              <div className="job-footer">
                <div className="job-author">
                  <div className="author-avatar" style={{ backgroundColor: job.author.color }}>
                    {job.author.initials}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{job.author.name}</div>
                    <div className="author-rating">★★★★★ 5.0</div>
                  </div>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn" disabled>Previous</button>
          <div className="pagination-numbers">
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
          </div>
          <button className="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
