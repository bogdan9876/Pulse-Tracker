import React, { useState, useEffect } from 'react';
import { fetchData, pressButton } from '../../api';
import './home.css';
import Header from '../Header/header';
import Loader from '../Loader/loader';
import { useSelector } from 'react-redux';

function Home() {
  const [data, setData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const isDarkMode = useSelector(state => state.isDarkMode);

  useEffect(() => {
    const intervalId = setInterval(getData, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const loadImage = async (imageName) => {
        const themeSuffix = isDarkMode && imageName === 'arrow' ? '-dark' : '';
        const src = `${imageName}${themeSuffix}.svg`;
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = (error) => reject(error);
            img.src = src;
        });
    };

    const loadImages = async () => {
        await Promise.all([
            loadImage('heart'),
            ...data.map(item => loadImage('liheart')),
        ]);
        await loadImage('arrow');
        setImageLoaded(true);
        setPageLoaded(true);
    };
    loadImages();
}, [data, isDarkMode]);


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

  if (!pageLoaded) {
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
        {imageLoaded && <img src={isDarkMode ? '/arrow-dark.svg' : '/arrow.svg'} alt="Arrow" className="arrow-icon" />}
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
            <li key={index} className={`liStyle ${isDarkMode ? 'dark' : ''}`}>
              <div className='date'>
                {date}
                <div className={`time ${isDarkMode ? 'dark' : ''}`}>
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
