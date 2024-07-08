import axios from 'axios';

const token = localStorage.getItem('accessToken');

export const pressButton = async () => {
  try {
    await axios.post('https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/press-button', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error pressing button:', error);
  }
};

export const fetchData = async () => {
  const response = await axios.get('https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/api/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendMessageToServer = async (message) => {
  const response = await axios.post(`https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/predict`, { message }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const saveChatMessage = async (messageData) => {
  const response = await axios.post(`https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/chat/message`, messageData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getChatHistory = async (chatId) => {
  const response = await axios.get(`https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/chat/history/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getChatList = async () => {
  const response = await axios.get('https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/chat/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateChatName = async (chatId, newChatName) => {
  try {
    const response = await axios.put(
      `https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/chat/update/${chatId}`,
      { chat_name: newChatName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating chat name:', error);
    throw error;
  }
};

export const deleteChat = async (chatId) => {
  const response = await axios.delete(`https://pulse-tracker-back-6a73aecb4f6b.herokuapp.com/chat/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};