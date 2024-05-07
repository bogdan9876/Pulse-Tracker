import React, { useState, useEffect } from 'react';
import { fetchData , simulateButtonPress} from '../../api';

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
    await simulateButtonPress();
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