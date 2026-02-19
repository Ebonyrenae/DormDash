import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up data:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Logo Header */}
        <div className="signup-logo">
          <h1 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer' }}
          >
            DORMDASH 🏃‍💨
          </h1>
          <p>College students helping college students</p>
        </div>

        {/* Sign Up Card */}
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Sign up with your .edu email to get started</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            {/* College Email */}
            <div className="form-group">
              <label htmlFor="email">College Email</label>
              <div className="input-with-icon">
                <svg className="input-icon" fill="none" viewBox="0 0 20 20">
                  <path d="M3.33333 5.83333L10 10.8333L16.6667 5.83333" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.33333 5.83333H16.6667V14.1667C16.6667 14.3877 16.5789 14.5996 16.4226 14.7559C16.2663 14.9122 16.0543 15 15.8333 15H4.16667C3.94565 15 3.73369 14.9122 3.57741 14.7559C3.42113 14.5996 3.33333 14.3877 3.33333 14.1667V5.83333Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@university.edu"
                  required
                />
              </div>
              <p className="input-hint">Must be a valid .edu email address</p>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <svg className="input-icon" fill="none" viewBox="0 0 20 20">
                  <path d="M5.83333 9.16667V5.83333C5.83333 4.72826 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72826 14.1667 5.83333V9.16667" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.16667 9.16667H15.8333C16.7538 9.16667 17.5 9.91286 17.5 10.8333V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V10.8333C2.5 9.91286 3.24619 9.16667 4.16667 9.16667Z" stroke="#99A1AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <div className="signup-footer">
            <p onClick={() => navigate('/signin')}>
              Already have an account? Sign in
            </p>
          </div>
        </div>

        {/* Why Section */}
        <div className="why-section">
          <h3>Why DormDev?</h3>
          <ul className="why-list">
            <li>
              <span className="checkmark">✓</span>
              <span>Connect with fellow students for help</span>
            </li>
            <li>
              <span className="checkmark">✓</span>
              <span>Earn money by sharing your skills</span>
            </li>
            <li>
              <span className="checkmark">✓</span>
              <span>Safe and verified .edu community</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignUp;