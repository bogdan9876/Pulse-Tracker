import './header.css';
import { NavLink} from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <NavLink exact to="/"><img src="logo.svg" alt="Logo" className="logo" /></NavLink>
            <NavLink to="/account" className="account">Account</NavLink>
        </div>
    );
}

export default Header;