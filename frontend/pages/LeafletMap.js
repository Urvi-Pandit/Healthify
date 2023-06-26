import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import axios from 'axios';

const LeafletMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      const map = L.map(mapRef.current).setView([latitude, longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Fetch nearby hospitals and display markers
      fetchNearbyHospitals(latitude, longitude, map);
    }
  }, [latitude, longitude]);

  const fetchNearbyHospitals = async (latitude, longitude, map) => {
    try {
      const response = await axios.get('https://overpass-api.de/api/interpreter', {
        params: {
          data: `[out:json];
            node["amenity"="hospital"](around:2000,${latitude},${longitude});
            out;`,
        },
      });

      const hospitals = response.data.elements;

      hospitals.forEach((hospital) => {
        const hospitalMarker = L.marker([hospital.lat, hospital.lon]).addTo(map);
        hospitalMarker.bindPopup(hospital.tags.name || 'Hospital');
      });
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
    }
  };

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default LeafletMap;
