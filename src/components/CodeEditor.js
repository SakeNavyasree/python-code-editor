import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = () => {
  const [ code, setCode ] = useState('');
  const [ output, setOutput ] = useState('');
  const [ isFullscreen, setIsFullscreen ] = useState(false);
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ shareMessage, setShareMessage ] = useState('');

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/execute', { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error connecting to server or executing code');
    }
  };

  const handleReset = () => {
    setCode('');
    setOutput('');
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const blob = new Blob([ code ], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'code.py';
    link.click();
  };

  const handleShareLink = () => {
    const encodedCode = encodeURIComponent(code);
    const link = `${window.location.href}share/${encodedCode}`;
    setShareMessage(`Share this link: ${link}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px',
    },
    editorContainer: {
      border: '2px solid #ccc',
      borderRadius: '8px',
      marginBottom: '30px',
      height: isFullscreen ? '100vh' : '500px',
    },
    outputContainer: {
      marginTop: '30px',
      padding: '15px',
      border: '2px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      fontSize: '20px',
    },
    button: {
      display: 'block',
      margin: '25px auto',
      padding: '15px 30px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
    },
    iconButton: {
      display: 'inline-block',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      padding: '10px',
      margin: '10px',
      cursor: 'pointer',
    },
    hamburger: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      cursor: 'pointer',
      fontSize: '30px',
      zIndex: '1000',
    },
    menu: {
      display: isMenuOpen ? 'block' : 'none',
      position: 'absolute',
      top: '70px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '10px',
      borderRadius: '8px',
      zIndex: '999',
    },
    menuItem: {
      color: 'white',
      backgroundColor: '#4CAF50',
      padding: '10px 20px',
      marginBottom: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    shareMessage: {
      color: 'green',
      marginTop: '10px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <div style={styles.menu}>
        <div style={styles.menuItem} onClick={handleReset}>⭯ Reset</div>
        <div style={styles.menuItem} onClick={handleFullscreen}>⛶ Fullscreen</div>
        <div style={styles.menuItem} onClick={handleDownload}>💾 Download</div>
        <div style={styles.menuItem} onClick={handleShareLink}>🔗 Share Link</div>
      </div>

      <div style={styles.editorContainer}>
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 18,
            lineNumbers: 'on',
          }}
        />
      </div>

      <button style={styles.button} onClick={handleRunCode}>
        Run Code
      </button>

      <div style={styles.outputContainer}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>

      { shareMessage && <div style={styles.shareMessage}>{ shareMessage }</div> }
    </div>
  );
};

export default CodeEditor;
