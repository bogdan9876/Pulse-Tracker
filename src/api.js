export const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/data');
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const simulateButtonPress = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/button', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ button: 31 }),
    });

    if (response.ok) {
      console.log('Button press simulated successfully');
    } else {
      console.error('Failed to simulate button press');
    }
  } catch (error) {
    console.error('Error simulating button press:', error);
  }
};

export { simulateButtonPress };