import axios from 'axios';

const backendUrl = 'http://localhost:5000'; 

export const runCode = async (code) => {
  try {
    const response = await axios.post(`${backendUrl}/run_code`, { code });
    return response.data;
  } catch (error) {
    console.error('Error running code:', error);
    throw error;
  }
};
