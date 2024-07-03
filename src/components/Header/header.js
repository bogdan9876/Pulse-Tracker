import './header.css';
import { NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store';

function Header() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.isDarkMode);

    const handleSunClick = () => {
        dispatch(toggleTheme());
      };

    return (
        <div className={`header ${isDarkMode ? 'dark' : ''}`}>
            <NavLink exact to="/"><img src="logo.svg" alt="Logo" className="logo" /></NavLink>
            <div className="account">
            <img src={isDarkMode ? '/moon.svg' : '/sun-light.svg'} onClick={handleSunClick}/>
            <NavLink to="/doctor" className="header-chat" >Doctors</NavLink>
            <NavLink to="/chat" className="header-chat" >ChatAI(demo)</NavLink>
            <NavLink to="/profile" className="header-account" >Account</NavLink>
            </div>
        </div>
    );
}

export default Header;
