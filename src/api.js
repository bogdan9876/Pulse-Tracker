import axios from 'axios';

export const pressButton = async () => {
  try {
    const token = localStorage.getItem('loggedInUser');
    await axios.post('http://localhost:5000/press-button', { token });
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

export const sendMessage = async (message) => {
  try {
      const axiosInstance = axios.create({
          baseURL: 'http://localhost:5000',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const response = await axiosInstance.post('/predict', { message });
      return response.data;
  } catch (error) {
      console.error('There was a problem with sending the message:', error);
      throw error;
  }
};