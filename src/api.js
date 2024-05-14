import axios from 'axios';

export const pressButton = async () => {
  try {
    const token = localStorage.getItem('loggedInUser');
    await axios.post('http://localhost:5000/press-button', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error pressing button:', error);
  }
};

export const fetchData = async () => {
  try {
    const token = localStorage.getItem('loggedInUser');
    const response = await axios.get('http://localhost:5000/api/data', { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const sendMessageToServer = async (message) => {
  try {
      const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      return await response.json();
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
  }
};