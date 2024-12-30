import React from 'react';
import CodeEditor from './components/CodeEditor'; 

function App() {
  const styles = {
    header: {
      textAlign: 'center',
      margin: '30px 0',
      fontSize: '40px', 
      fontWeight: '700', 
      color: '#4CAF50', 
      padding: '20px', 
      borderRadius: '10px', 
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: 'normal',
    },
  };

  return (
    <div>
      <h1 style={styles.header}>
        Python Code Editor <span style={{ fontSize: '28px' }}> &lt;&nbsp;&gt; </span> {/* Logo with < > */}
      </h1>
      <CodeEditor />
    </div>
  );
}

export default App;
