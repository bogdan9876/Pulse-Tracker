import React, { useState, useEffect } from 'react';
import { fetchData, pressButton } from '../../api';
import './home.css';
import Header from '../Header/header';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(getData, 500);

    return () => clearInterval(intervalId);
  }, []);

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
        <div className="button" onClick={handleButtonClick}>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          PRESS
        </div>
      </div>
      <ul className="uls">
        {data.map((item, index) => {
          const createdAt = new Date(item.created_at);
          const date = `${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()}`;
          const time = `${createdAt.getHours() - 3}:${createdAt.getMinutes()}`;

          return (
            <li key={index} className="liStyle">
              <div className='date'>
                {date}
                <div className='time'>
                  {time}
                </div>
              </div>
              <div className="heartRateContainer">
                <span className="heartRate">{item.heart_rate}</span>
                <img src="liheart.svg" alt="Heart" className="heartIcon" />
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default Home;