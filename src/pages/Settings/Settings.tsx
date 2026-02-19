import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import MenuButton from "../../components/ui/MenuButton";
import "./settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <div className="settings-page">
      <MenuButton onClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="settings-content">
        {/* Page Header */}
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
        </div>

        <div className="settings-divider"></div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            <svg className="avatar-icon" fill="none" viewBox="0 0 63 63">
              <path
                d="M 52.5 31.5 C 52.5 43.3741 42.8741 53 31.5 53 C 20.1259 53 10.5 43.3741 10.5 31.5 C 10.5 19.6259 20.1259 10 31.5 10 C 42.8741 10 52.5 19.6259 52.5 31.5 Z"
                stroke="#29AC3D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6.5625"
              />
              <path
                d="M 31.5 21 L 31.5 31.5 L 39.375 31.5"
                stroke="#29AC3D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6.5625"
              />
            </svg>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Jane Doe</h2>
            <p className="profile-email">janedoe@university.edu</p>
          </div>
        </div>

        {/* Account Settings */}
        <section className="settings-section">
          <h3 className="section-title">Account Settings</h3>

          <div className="settings-list">
            {/* Email Address */}
            <button className="setting-item">
              <div className="setting-left">
                <div className="setting-icon">
                  <svg fill="none" viewBox="0 0 38 38">
                    <path
                      d="M 31.6667 19 C 27.6167 19 23.7917 20.5833 21 23.4167"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 31.6667 28.5 L 31.6667 19 L 22.1667 19"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                  </svg>
                </div>
                <div className="setting-text">
                  <div className="setting-label">Email Address</div>
                  <div className="setting-value">janedoe@university.edu</div>
                </div>
              </div>
              <svg className="chevron-icon" fill="none" viewBox="0 0 38 38">
                <path
                  d="M 12.6667 19 L 25.3333 19"
                  stroke="#6A7282"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.16667"
                />
              </svg>
            </button>

            {/* Phone Number */}
            <button className="setting-item">
              <div className="setting-left">
                <div className="setting-icon">
                  <svg fill="none" viewBox="0 0 38 38">
                    <path
                      d="M 12.6667 19 C 12.6667 25.4433 17.8901 30.6667 24.3333 30.6667 C 30.7766 30.6667 36 25.4433 36 19 M 22.1667 15.8333 L 24.3333 19 L 26.5 15.8333"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                  </svg>
                </div>
                <div className="setting-text">
                  <div className="setting-label">Phone Number</div>
                  <div className="setting-value">+1 (555) 123-4567</div>
                </div>
              </div>
              <svg className="chevron-icon" fill="none" viewBox="0 0 38 38">
                <path
                  d="M 12.6667 19 L 25.3333 19"
                  stroke="#6A7282"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.16667"
                />
              </svg>
            </button>

            {/* University */}
            <button className="setting-item">
              <div className="setting-left">
                <div className="setting-icon">
                  <svg fill="none" viewBox="0 0 38 38">
                    <path
                      d="M 31.6667 6.33333 L 31.6667 9.5"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 25.3333 6.33333 L 31.6667 6.33333 L 38 6.33333"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 9.5 12.6667 L 53.8333 12.6667 L 53.8333 34.8333 C 53.8333 36.3083 53.2469 37.7229 52.2029 38.7669 C 51.1589 39.8109 49.7443 40.3973 48.2693 40.3973 L 15.064 40.3973 C 13.589 40.3973 12.1744 39.8109 11.1304 38.7669 C 10.0864 37.7229 9.5 36.3083 9.5 34.8333 L 9.5 12.6667 Z"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 15.8333 9.5 L 22.1667 9.5"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 15.8333 15.8333 L 22.1667 15.8333"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 15.8333 22.1667 L 22.1667 22.1667"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 15.8333 28.5 L 22.1667 28.5"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                  </svg>
                </div>
                <div className="setting-text">
                  <div className="setting-label">University</div>
                  <div className="setting-value">University at Buffalo</div>
                </div>
              </div>
              <svg className="chevron-icon" fill="none" viewBox="0 0 38 38">
                <path
                  d="M 12.6667 19 L 25.3333 19"
                  stroke="#6A7282"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.16667"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section className="settings-section">
          <h3 className="section-title">Preferences</h3>

          <div className="settings-list">
            {/* Notifications */}
            <button className="setting-item">
              <div className="setting-left">
                <div className="setting-icon">
                  <svg fill="none" viewBox="0 0 38 38">
                    <path
                      d="M 19 12.6667 C 19 16.1644 21.8356 19 25.3333 19 C 28.831 19 31.6667 16.1644 31.6667 12.6667 C 31.6667 9.169 28.831 6.33333 25.3333 6.33333 C 21.8356 6.33333 19 9.169 19 12.6667 Z"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 6.33333 30.6667 C 6.33333 27.7942 7.47381 25.0393 9.50049 23.0126 C 11.5272 20.9859 14.2821 19.8454 17.1546 19.8454 L 33.5121 19.8454 C 36.3846 19.8454 39.1395 20.9859 41.1662 23.0126 C 43.1929 25.0393 44.3333 27.7942 44.3333 30.6667"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                  </svg>
                </div>
                <div className="setting-text">
                  <div className="setting-label">Notifications</div>
                  <div className="setting-value">
                    Manage your notification preferences
                  </div>
                </div>
              </div>
              <svg className="chevron-icon" fill="none" viewBox="0 0 38 38">
                <path
                  d="M 12.6667 19 L 25.3333 19"
                  stroke="#6A7282"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.16667"
                />
              </svg>
            </button>

            {/* Privacy & Security */}
            <button className="setting-item">
              <div className="setting-left">
                <div className="setting-icon">
                  <svg fill="none" viewBox="0 0 38 38">
                    <path
                      d="M 31.6667 19 C 31.6667 20.768 30.9643 22.4638 29.714 23.714 C 28.4638 24.9643 26.768 25.6667 25 25.6667 C 23.232 25.6667 21.5362 24.9643 20.286 23.714 C 19.0357 22.4638 18.3333 20.768 18.3333 19"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 12.6667 28.5 C 12.6667 30.268 13.369 31.9638 14.6193 33.214 C 15.8695 34.4643 17.5652 35.1667 19.3333 35.1667 C 21.1014 35.1667 22.7971 34.4643 24.0474 33.214 C 25.2976 31.9638 26 30.268 26 28.5"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                  </svg>
                </div>
                <div className="setting-text">
                  <div className="setting-label">Privacy & Security</div>
                  <div className="setting-value">
                    Control your privacy settings
                  </div>
                </div>
              </div>
              <svg className="chevron-icon" fill="none" viewBox="0 0 38 38">
                <path
                  d="M 12.6667 19 L 25.3333 19"
                  stroke="#6A7282"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.16667"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Support */}
        <section className="settings-section">
          <h3 className="section-title">Support</h3>

          <div className="settings-list">
            {/* Help Center */}
            <button className="setting-item">
              <div className="setting-left">
                <div className="setting-icon">
                  <svg fill="none" viewBox="0 0 38 38">
                    <path
                      d="M 31.6667 33.25 C 31.6667 38.1365 27.5532 42.25 22.6667 42.25 C 17.7802 42.25 13.6667 38.1365 13.6667 33.25 C 13.6667 28.3635 17.7802 24.25 22.6667 24.25 C 27.5532 24.25 31.6667 28.3635 31.6667 33.25 Z"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 22.6667 29.0833 L 22.6667 33.25 L 25.4583 36.0417"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                    <path
                      d="M 19 26.9167 L 19.0158 26.9167"
                      stroke="#29AC3D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3.16667"
                    />
                  </svg>
                </div>
                <div className="setting-text">
                  <div className="setting-label">Help Center</div>
                  <div className="setting-value">FAQs and support articles</div>
                </div>
              </div>
              <svg className="chevron-icon" fill="none" viewBox="0 0 38 38">
                <path
                  d="M 12.6667 19 L 25.3333 19"
                  stroke="#6A7282"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.16667"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Log Out Button */}
        <button className="logout-button" onClick={handleLogout}>
          <svg className="logout-icon" fill="none" viewBox="0 0 38 38">
            <path
              d="M 11.0833 11.0833 L 26.9167 26.9167"
              stroke="#FB2C36"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.16667"
            />
            <path
              d="M 26.9167 11.0833 L 11.0833 26.9167"
              stroke="#FB2C36"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.16667"
            />
            <path
              d="M 33.25 19 L 14.25 19"
              stroke="#FB2C36"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.16667"
            />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
