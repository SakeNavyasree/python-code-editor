import axios from 'axios';

const backendUrl = 'https://python-code-editor-dli9.onrender.com'; 

export const runCode = async (code) => {
  try {
    const response = await axios.post(`${backendUrl}/execute`, { code });
    return response.data; 
  } catch (error) {
    console.error('Error running code:', error);
    throw error;
  }
};

