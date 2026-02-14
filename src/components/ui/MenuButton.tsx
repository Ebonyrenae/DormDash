import Menu from '../../../imports/Menu';
import './menubutton.css';

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button className="menu-button" onClick={onClick} aria-label="Toggle menu">
      <div className="menu-icon">
        <Menu />
      </div>
    </button>
  );
};

export default MenuButton;
