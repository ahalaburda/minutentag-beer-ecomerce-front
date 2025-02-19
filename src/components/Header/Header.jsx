import MenuIcon from '../../icons/MenuIcon';
import './Header.scss';
import avatar from '../../../public/products/icons/avatar.jpg';

/**
 * Header component displays the top navigation bar with a menu button and avatar.
 * @returns {JSX.Element} A header component containing a menu button and user avatar
 */
export default function Header() {
  return (
    <header className="header">
      <button className="btn">
        <MenuIcon />
      </button>
      <div className="avatar">
        <img src={avatar} alt="avatar" />
      </div>
    </header>
  );
}
