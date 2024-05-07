import './header.css';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({ searchTerm, onSearchChange }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const confirmed = window.confirm('Are you sure you want to sign out?');
        
        if (confirmed) {
            localStorage.removeItem('loggedInUser');
            navigate('/login');
        }
    };
    
    return (
        <header className="header">
            <div className="header__nav">
                <div className="header__nav-logo">
                    <img src="logos/logo.png" alt="logo" width="70" height="70" />
                </div>
                <div className="header__nav-pages">
                    <NavLink exact to="/">
                        <button type="button" className="header__page">
                            Home
                        </button>
                    </NavLink>
                    <NavLink to="/catalog">
                        <button type="button" className="header__page">
                            Catalog
                        </button>
                    </NavLink>
                    <NavLink to="/cart">
                        <button type="button" className="header__page">
                            Cart
                        </button>
                    </NavLink>
                </div>
                <button type="button" className="header__sign-out" onClick={handleSignOut}>
                    Sign me out
                </button>
                <input type="search" className="header__search" placeholder="Search" value={searchTerm} onChange={onSearchChange} />
            </div>
        </header>
    );
}

export default Header;