import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Form } from 'formik';
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
                <div className='profile-inputs'>
                    <span className='profile-text1'>Name:</span>
                    <input type="text" placeholder="Your name" />
                    <span className='profile-text1'>Surname</span>
                    <input type="text" placeholder="Your surname" />
                    <span className='profile-text1'>Email</span>
                    <input type="email" placeholder="Your email" />
                    <span className='profile-text1'>Number</span>
                    <input type="text" placeholder="Your number" />
                    <span className='profile-text1'>Address</span>
                    <input type="text" placeholder="Your address" />
                </div>
                <div class='profile-logout' onClick={handleSignOut}>
                    <span class="logout">Log out</span>
                    <img src="logout.svg" alt="Heart" class="logout-icon" />
                </div>
            </div>
        </div>
    )
}

export default Profile
