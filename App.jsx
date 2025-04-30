import React, { useState } from 'react';
import { Upload, Button, Spin, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setAdvice(data.advice);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>💸 Smart Spend Advisor</h1>
      <p className="tagline">Drop your spend screenshot. Get brutally honest, smart AF savings advice.</p>

      <Upload beforeUpload={(f) => { setFile(f); return false; }} maxCount={1}>
        <Button icon={<UploadOutlined />}>Click or drag file</Button>
      </Upload>

      <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }} disabled={!file}>
        Get Advice
      </Button>

      {loading && <div className="loading"><Spin tip="Analyzing..."/></div>}
      {advice && (
        <div className="result-box">
          <Typography.Title level={4}>📋 Your Advice</Typography.Title>
          <Typography.Paragraph>{advice}</Typography.Paragraph>
        </div>
      )}
    </div>
  );
}

export default App;