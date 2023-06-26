import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState('');

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

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={symptoms.join(', ')} onChange={handleSymptomChange} />
      <button type="submit">Detect Disease</button>
      {result && <p>Detected disease: {result}</p>}
      {result && (
        <Link href={`/remedies?disease=${encodeURIComponent(result)}`}>
          Get Remedies
        </Link>
      )}
    </form>
  );
};

export default Home;
