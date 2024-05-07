import React, { useState, useEffect } from 'react';
import { fetchData, pressButton } from '../../api';
import './home.css';

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
      <h1 className='heder'>Health Data</h1>
      <button className="b1" onClick={handleButtonClick}>Simulate Button Press</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>Heart Rate: {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;