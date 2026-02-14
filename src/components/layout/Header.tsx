import { useNavigate } from 'react-router-dom';
import './header.css';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <div className="header-content">
        {showBackButton && (
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
