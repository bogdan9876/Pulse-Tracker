import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

export default App;
