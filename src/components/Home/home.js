import React, { useState, useEffect } from 'react';
import { fetchData, pressButton } from '../../api';
import './home.css';
import Header from '../Header/header';

function Home() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const intervalId = setInterval(getData, 500);

  //   return () => clearInterval(intervalId);
  // }, []);

  const getData = async () => {
    const newData = await fetchData();
    setData(newData);
  };

  const handleButtonClick = async () => {
    await pressButton();
  };

  return (
    <div>
      <Header />
      <div className='main-header'>MONITOR</div>
      <div className="heart-container">
        <span className="heart-text">your</span>
        <img src="heart.svg" alt="Heart" className="heart-icon" />
      </div>
      <div className="sub-header">
        <div className="header-content">HEART</div>
        <img src="arrow.svg" alt="Arrow" className="arrow-icon" />
      </div>
      <div className="buttons">
      <div className="button" onClick={handleButtonClick}>Press</div>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>Heart Rate: {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;