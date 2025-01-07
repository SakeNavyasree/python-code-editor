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
// import axios from 'axios';

// const backendUrl = 'https://python-code-editor-dli9.onrender.com'; // Updated to the deployed backend URL

// export const runCode = async (code) => {
//   try {
//     // Send the code to the backend's /execute route
//     const response = await axios.post(`${backendUrl}/execute`, { code });
//     return response.data; // Returns the output from the backend
//   } catch (error) {
//     console.error('Error running code:', error);
//     throw error;
//   }
// };
