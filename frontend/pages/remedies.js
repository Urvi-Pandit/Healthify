import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

const Remedies = ({ latitude, longitude }) => {
  const [remedies, setRemedies] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.disease) {
      fetchRemedies(router.query.disease);
    }
  }, [router.query.disease]);

  const fetchRemedies = async (disease) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: `Home remedies for ${disease}`,
          max_tokens: 100,
          temperature: 0.7,
          n: 1,
          model: 'text-davinci-003', // Specify the model to use
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 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', // Replace with your OpenAI API key
          },
        }
      );

      const remedy = response.data.choices[0].text;
      console.log('OpenAI API response:', response.data);
      setRemedies(remedy);

      // Fetch user's current location
      fetchCurrentLocation();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCurrentLocation = () => {
    // Check if geolocation is supported by the browser
    if (typeof window !== 'undefined' && navigator.geolocation) {
      // Fetch user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          displayMap(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const displayMap = (latitude, longitude) => {
    const mapContainer = document.getElementById('map');

    if (mapContainer && !mapContainer._leaflet) {
      const map = L.map(mapContainer).setView([latitude, longitude], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map);

      return () => {
        map.remove();
      };
    }
  };

  return (
    <div>
      <h1>Remedies for {router.query.disease}</h1>
      <p>{remedies}</p>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <LeafletMap latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default Remedies;
