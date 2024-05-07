import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const pressButton = async () => {
  try {
    await axios.post('http://localhost:5000/press-button');
  } catch (error) {
    console.error('Error pressing button:', error);
  }
};