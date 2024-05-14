import './header.css';
import { NavLink} from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <NavLink exact to="/"><img src="logo.svg" alt="Logo" className="logo" /></NavLink>
            <div className="account">
            <NavLink to="/doctor" className="header-chat" >Doctor</NavLink>
            <NavLink to="/chat" className="header-chat" >ChatAI(demo)</NavLink>
            <NavLink to="/profile" className="header-account" >Account</NavLink>
            </div>
        </div>
    );
}

export default Header;