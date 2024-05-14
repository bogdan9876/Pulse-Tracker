import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './profile.css';
import Header from '../Header/header';


const Profile = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const confirmed = window.confirm('Are you sure you want to sign out?');
        
        if (confirmed) {
            localStorage.removeItem('loggedInUser');
            navigate('/login');
        }
    };

    return (
        <div>
            <Header />
            <div className='profile-header'>MY ACCOUNT</div>
            <div className='profile-container'>
                <div class='profile-logout' onClick={handleSignOut}>
                    <span class="logout">Log out</span>
                    <img src="logout.svg" alt="Heart" class="logout-icon" />
                </div>
            </div>
        </div>
    )
}

export default Profile
