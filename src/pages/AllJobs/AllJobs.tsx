import { useState } from 'react';
import BottomNav from '../../components/layout/BottomNav';
import JobCard from '../../components/ui/JobCard';
import { jobsData } from '../../data/jobs';
import './alljobs.css';

const AllJobs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter jobs based on category and search
  const filteredJobs = jobsData.filter((job) => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'All Jobs' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'tutoring', label: 'Tutoring' },
    { value: 'moving', label: 'Moving' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="alljobs-page">
      {/* Header */}
      <header className="alljobs-header">
        <h1>Browse Jobs</h1>
        <p>Find opportunities that work for you</p>
      </header>

      {/* Search and Filters */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <main className="jobs-content">
        <div className="jobs-count">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
        </div>
        <div className="jobs-grid">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onAction={(id) => alert(`Applied to job ${id}`)}
                actionLabel="Apply Now"
              />
            ))
          ) : (
            <div className="no-jobs">
              <p>No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default AllJobs;
