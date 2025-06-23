// src/components/NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.svg"
import './NavBar.css';


const NavBar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
      <img src={logo} alt='SayHi Words' />
      </Link>

      <div className="site-title">SayHi Words</div>
      
      <ul className="nav-links">
        <li><Link to='/'>Главная</Link></li>
        <li><Link to='/game'>Карточки</Link></li>
      </ul>
      {/* {location.pathname === '/' && (
        <Link to='/game'>
          <button className="training-button">Начать тренировку</button>
        </Link>
      )} */}
    </nav>
  );
};


export default NavBar;
