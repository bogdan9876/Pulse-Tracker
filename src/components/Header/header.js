import './header.css';
import { NavLink } from 'react-router-dom';
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
            <NavLink exact to="/"><img src={isDarkMode ? '/logo-dark.svg' : '/logo.svg'} alt="Logo" className="logo" /></NavLink>
            <div className="account">
                <NavLink to="/doctor" className={`header-chat ${isDarkMode ? 'dark' : ''}`} >Doctors</NavLink>
                <NavLink to="/chat" className={`header-chat ${isDarkMode ? 'dark' : ''}`} >ChatAI(demo)</NavLink>
                <NavLink to="/profile" className={`header-chat ${isDarkMode ? 'dark' : ''}`} >Account</NavLink>
            </div>
            <img src={isDarkMode ? '/sun.svg' : '/moon.svg'} onClick={handleSunClick} />
        </div>
    );
}

export default Header;
