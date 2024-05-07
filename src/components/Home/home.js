import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const jsonData = await fetchData();
      setData(jsonData);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Health Data</h1>
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