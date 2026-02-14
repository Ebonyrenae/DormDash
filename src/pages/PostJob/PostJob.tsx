import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import MenuButton from '../../components/ui/MenuButton';
import svgPaths from '../../../imports/svg-81xve1y8fp';
import './postjob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState('fixed');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    skills: '',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/my-requests');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="post-job-page">
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Header */}
      <header className="postjob-header">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/dashboard')}>
            🏃‍💨 DormDash
          </div>
          <div className="header-nav">
            <button className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/jobs')}>Browse Jobs</button>
          </div>
        </div>
      </header>

      <div className="post-job-content">
        {/* Page Header */}
        <div className="page-header-card">
          <h1 className="page-title">Post a New Job</h1>
          <p className="page-subtitle">Describe what you need help with and connect with talented students</p>
        </div>

        {/* Info Banner */}
        <div className="info-banner">
          <svg className="info-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#2B7FFF" strokeWidth="1.5" />
            <path d="M10 6V10" stroke="#2B7FFF" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="10" cy="13" r="0.5" fill="#2B7FFF" />
          </svg>
          <div className="info-text">
            <strong>Tips for posting a great job:</strong><br />
            Be specific about what you need, set a fair price, and include any relevant details or requirements. Clear job posts get better responses!
          </div>
        </div>

        {/* Form */}
        <form className="job-form" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Job Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              placeholder="e.g., Help with React Assignment"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <p className="form-hint">Write a clear, specific title that describes what you need</p>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="tutoring">Tutoring</option>
              <option value="design">Design</option>
              <option value="writing">Writing</option>
              <option value="language">Language</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Provide details about what you need help with, any specific requirements, and what the helper should know..."
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
            <p className="form-hint">Include all relevant details to help students understand the job</p>
          </div>

          {/* Payment Type and Fixed Price */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Payment Type <span className="required">*</span>
              </label>
              <div className="payment-type-buttons">
                <button
                  type="button"
                  className={`payment-btn ${paymentType === 'fixed' ? 'active' : ''}`}
                  onClick={() => setPaymentType('fixed')}
                >
                  Fixed Price
                </button>
                <button
                  type="button"
                  className={`payment-btn ${paymentType === 'hourly' ? 'active' : ''}`}
                  onClick={() => setPaymentType('hourly')}
                >
                  Hourly Rate
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Fixed Price <span className="required">*</span>
              </label>
              <div className="price-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-input price-input"
                  placeholder="25"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="form-hint">Set a fair price based on complexity and time needed</p>
            </div>
          </div>

          {/* Location and Deadline */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M10 13.3333 C 12.7614 13.3333 15 11.0948 15 8.33333 C 15 5.57191 12.7614 3.33333 10 3.33333 C 7.23858 3.33333 5 5.57191 5 8.33333 C 5 11.0948 7.23858 13.3333 10 13.3333 Z" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 15.5 16.6667 C 15.5 14.8986 14.7976 13.2029 13.5474 11.9526 C 12.2971 10.7024 10.6014 10 8.83333 10 L 11.1667 10 C 9.39856 10 7.70286 10.7024 6.45262 11.9526 C 5.20238 13.2029 4.5 14.8986 4.5 16.6667" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 10 5 L 10 5.00833" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-input"
                  placeholder="e.g., Remote or Library - 3rd Floor"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="deadline" className="form-label">
                Deadline <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#99A1AF" strokeWidth="1.5" />
                  <path d="M10 6V10L13 13" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  className="form-input"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="form-group">
            <label htmlFor="skills" className="form-label">
              Required Skills (Optional)
            </label>
            <div className="input-with-icon">
              <svg className="input-icon" viewBox="0 0 20 20" fill="none">
                <path d="M3.33333 6.66667H16.6667M6.66667 10H13.3333M8.33333 13.3333H11.6667" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                id="skills"
                name="skills"
                className="form-input"
                placeholder="e.g., React, JavaScript, Debugging"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
            <p className="form-hint">Separate multiple skills with commas</p>
          </div>

          {/* Attachments */}
          <div className="form-group">
            <label className="form-label">Attachments (Optional)</label>
            <div className="upload-area">
              <svg className="upload-icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 8L12 3L7 8" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3V15" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="upload-text">
                <span className="upload-link">Click to upload</span> or drag and drop
              </p>
              <p className="upload-hint">PNG, JPG, PDF (Max. 10MB)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Post Job
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>

        {/* Pricing Guide */}
        <div className="pricing-guide">
          <div className="guide-header">
            <svg className="guide-icon" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#F59E0B" strokeWidth="1.5" />
              <path d="M10 6V10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="13" r="0.5" fill="#F59E0B" />
            </svg>
            <h3 className="guide-title">Pricing Guide</h3>
          </div>
          
          <div className="pricing-categories">
            <div className="pricing-category">
              <h4 className="category-name">Simple Tasks</h4>
              <p className="category-price">$15-$30</p>
              <p className="category-desc">Quick questions, basic help</p>
            </div>
            
            <div className="pricing-category">
              <h4 className="category-name">Moderate Tasks</h4>
              <p className="category-price">$30-$60</p>
              <p className="category-desc">Tutoring, project help</p>
            </div>
            
            <div className="pricing-category">
              <h4 className="category-name">Complex Tasks</h4>
              <p className="category-price">$60+</p>
              <p className="category-desc">Full projects, expert work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
