import React from 'react';
import Header from '../Header/header';
import './doctor.css';

const Doctor = () => {
    return (
        <>
            <Header />
            <div>
                <div className='main-header'>Doctors</div>
                <div className="titleContainer">
                    <h2 className="title">Available doctors</h2>
                </div>
                <div  className="elements-doctors">
                <div className="divided1">
                    <div className="leftSection1">
                        <div className="item">
                            <span className="itemText1">position</span>
                            <span className="itemNumber">Cardiologist</span>
                        </div>
                        <div className="item">
                            <span className="itemText1">experience</span>
                            <span className="itemNumber">10+ years</span>
                        </div>
                        <div className="item">
                            <span className="itemText1">location</span>
                            <span className="itemNumber">Lviv</span>
                        </div>
                        <div className="quote">
                            <span className="quoteText">"</span>
                            <p className="quoteContent"> Experienced cardiologist specializing
                             in the diagnosis and treatment of heart diseases.
                              Provides comprehensive care to patients, ensuring 
                              the highest level of medical assistance.</p>
                        </div>
                    </div>
                    <div className="rightSection15">
                        <img src="/doctors/doctor1.jpg" alt="Extra" className="extraImage" />
                        <div className="learnMoreContainer5">
                            <div className="learnMore5">
                                <p className="learnMoreText5">Sign up for a visit</p>
                                <img src="/arrow2.svg" alt="Arrow" className="arrowIcon" />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Doctor;

