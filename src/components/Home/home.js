import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api';
import axios from 'axios'; 

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const jsonData = await fetchData();
      setData(jsonData);
    };

    getData();
  }, []);

  const handleButtonClick = async () => {
    await axios.post('http://localhost:5000/press-button');
  };

  return (
    <div>
      <h1>Health Data</h1>
      <button onClick={handleButtonClick}>Simulate Button Press</button>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Heart Rate: {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;