import axios from 'axios';

const token = localStorage.getItem('accessToken');

export const pressButton = async () => {
  try {
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
  const response = await axios.get('http://localhost:5000/api/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const sendMessageToServer = async (message) => {
  const response = await axios.post(`http://localhost:5000/predict`, { message }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  });
  return response.data;
};

export const saveChatMessage = async (messageData) => {
  const response = await axios.post(`http://localhost:5000/chat/message`, messageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};

export const getChatHistory = async (chatId) => {
    const response = await axios.get(`http://localhost:5000/chat/history/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};

export const getChatList = async () => {
    const response = await axios.get('http://localhost:5000/chat/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};