import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form } from 'formik';
import './profile.css';
import Header from '../Header/header';

const Profile = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        phone_number: '',
        address: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('loggedInUser');
                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserData(data.user);
                } else {
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSaveChanges = async () => {
        try {
            const confirmed = window.confirm('Are you sure you want to save changes?');
            if (!confirmed) window.location.reload();;
    
            const token = localStorage.getItem('loggedInUser');
            const response = await fetch('http://localhost:5000/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                    <input type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Your name" />
                    <span className='profile-text1'>Surname</span>
                    <input type="text" name="surname" value={userData.surname} onChange={handleInputChange} placeholder="Your surname" />
                    <span className='profile-text1'>Email</span>
                    <input type="email" value={userData.email} placeholder="Your email" disabled />
                    <span className='profile-text1'>Number</span>
                    <input type="text" name="phone_number" value={userData.phone_number} onChange={handleInputChange} placeholder="Your number" />
                    <span className='profile-text1'>Address</span>
                    <input type="text" name="address" value={userData.address} onChange={handleInputChange} placeholder="Your address" />
                </div>
                <button className="save-button" onClick={handleSaveChanges}>Save changes</button>
                <div className='profile-logout'>
                    <div className="logout-container" onClick={handleSignOut}>
                        <span className="logout">Log out</span>
                        <img src="logout.svg" alt="Heart" className="logout-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
