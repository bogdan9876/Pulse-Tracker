import './header.css';

function Header() {
    return (
        <div className="header">
            <img src="logo.svg" alt="Logo" className="logo" />
            <div className="account">Account</div>
        </div>
    );
}

export default Header;