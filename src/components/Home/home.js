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
      <div className='heder'>MONITOR</div>
      <button onClick={handleButtonClick}>Simulate Button Press</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>Heart Rate: {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;