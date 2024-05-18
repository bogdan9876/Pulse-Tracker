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
  const response = await axios.post(`http://localhost:5000/predict`, { message });
  return response.data;
};

export const saveChatMessage = async (messageData) => {
  const token = localStorage.getItem('loggedInUser');
  const response = await axios.post(`http://localhost:5000/chat/message`, messageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};

export const getChatHistory = async () => {
  const token = localStorage.getItem('loggedInUser');
  const response = await axios.get(`http://localhost:5000/chat/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};