import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/header';
import './doctor.css';

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);

    const handleSignupClick88 = () => {
        const confirmed = window.confirm('Are you sure that you want to be redirected to a third-party site?');
        if (confirmed) {
            window.location.href = 'https://helsi.me';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div>
                <div className='main-header'>Doctors</div>
                <div className='profile-inputs88'>
                    <input type="text" name="name" placeholder="Find doctor" />
                    <img src="/loop.svg" alt="Search" className="search-icon88" />
                </div>
                <div className="titleContainer">
                    <h2 className="title">Available doctors</h2>
                </div>
                <div className="elements-doctors">
                    {doctors.map((doctor, index) => (
                        <div key={index} className="divided1">
                            <div className="leftSection1">
                                <div className="item">
                                    <span className="itemText1">Name</span>
                                    <span className="itemNumber">{doctor.name}</span>
                                </div>
                                <div className="item">
                                    <span className="itemText1">Position</span>
                                    <span className="itemNumber">{doctor.position}</span>
                                </div>
                                <div className="item">
                                    <span className="itemText1">Experience</span>
                                    <span className="itemNumber">{doctor.experience}</span>
                                </div>
                                <div className="item">
                                    <span className="itemText1">Location</span>
                                    <span className="itemNumber">{doctor.location}</span>
                                </div>
                                <div className="quote">
                                    <span className="quoteText">"</span>
                                    <p className="quoteContent">{doctor.description}</p>
                                </div>
                            </div>
                            <div className="rightSection15">
                                <img src={`/doctors/${doctor.image}`} alt="Doctor" className="extraImage" />
                                <div className="learnMoreContainer5">
                                    <div className="learnMore5">
                                        <p className="learnMoreText5" onClick={handleSignupClick88}>Sign up for a visit</p>
                                        <img src="/arrow2.svg" alt="Arrow" className="arrowIcon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Doctor;
