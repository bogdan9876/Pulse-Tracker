import React, { useState, useEffect } from 'react';
import { fetchData, pressButton } from '../../api';
import './home.css';
import Header from '../Header/header';
import Loader from '../Loader/loader';

function Home() {
  const [data, setData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(getData, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const loadImage = async (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = (error) => reject(error);
        img.src = src;
      });
    };

    const loadHeader = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      setHeaderLoaded(true);
    };

    const loadImages = async () => {
      await Promise.all([
        loadImage('heart.svg'),
        loadImage('arrow.svg'),
        ...data.map(item => loadImage('liheart.svg')),
      ]);
      setImageLoaded(true);
      setPageLoaded(true);
    };

    loadHeader();
    loadImages();

  }, [data]);

  const getData = async () => {
    try {
      const newData = await fetchData();
      setData(newData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = async () => {
    await pressButton();
  };

  if (!pageLoaded || !headerLoaded) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <div className='main-header'>MONITOR</div>
      <div className="heart-container">
        <span className="heart-text">your</span>
        {imageLoaded && <img src="heart.svg" alt="Heart" className="heart-icon" />}
      </div>
      <div className="sub-header">
        <div className="header-content">HEART</div>
        {imageLoaded && <img src="arrow.svg" alt="Arrow" className="arrow-icon" />}
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
        {data && data.map((item, index) => {
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
                {imageLoaded && <img src="liheart.svg" alt="Heart" className="heartIcon" />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
