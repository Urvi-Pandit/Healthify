import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Page.module.css'
import { useRouter } from 'next/router';

const Home = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/detect-disease', { symptoms });

      if (response.status === 200) {
        setResult(response.data.disease);
        setSymptoms([]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error states
    }
  };

  const handleSymptomChange = (event) => {
    const selectedSymptoms = event.target.value.split(',').map((symptom) => symptom.trim());
    setSymptoms(selectedSymptoms);
  };
  const handleGetRemedies = () => {
    // Your logic for handling the "Get Remedies" button click
    // For example, you can navigate to the remedies page with the disease parameter
    router.push(`/remedies?disease=${encodeURIComponent(result)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
<div className="flex flex-col items-center justify-center h-screen bg-teal-200">
  {!result && (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={symptoms.join(', ')}
        onChange={handleSymptomChange}
        className={styles.input_text}
      />
      
      <button type="submit" className={styles.button}>
        Detect Disease
      </button>
      
    </div>
  )}
  {result && (
    <div className={styles.box}>
      <h2 className="text-xl mb-2 text-white">Detected Disease:</h2>
      <h2 className="text-2xl font-bold text-white">{result}</h2>
    </div>
  )}
  {result && (
        <button className={styles.button1} onClick={handleGetRemedies}>
          Get Remedies
        </button>
      )}
</div>
</form>

  );
};

export default Home;