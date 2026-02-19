import { useNavigate } from 'react-router-dom';
import './notfound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-description">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="notfound-buttons">
          <button className="notfound-btn-primary" onClick={() => navigate('/')}>
            Go to Home
          </button>
          <button className="notfound-btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
