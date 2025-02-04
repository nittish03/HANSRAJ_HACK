'use client'
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
  TrafficLayer,
  DistanceMatrixService,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi

const locations = [
  { lat: 28.7041, lng: 77.1025, name: "Delhi" },
  { lat: 28.4595, lng: 77.0266, name: "Gurgaon" },
  { lat: 28.5355, lng: 77.3910, name: "Noida" },
];

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // Needed for Autocomplete
  });

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchLocation, setSearchLocation] = useState(defaultCenter);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distanceData, setDistanceData] = useState(null);

  // Get User's Current Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);
  // Simulate Real-Time Tracking
  useEffect(() => {
    if (currentLocation) {
      const interval = setInterval(() => {
        setCurrentLocation((prev) => ({
          lat: prev.lat + 0.0001,
          lng: prev.lng + 0.0001,
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentLocation]);

  // Handle Search
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setSearchLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  if (!isLoaded) return <div>Loading...</div>; // Ensure Google Maps is loaded

  return (
    <div style={{ padding: "20px" }}>
      <h1>Google Maps with All Features</h1>

      {/* Search Box */}
      <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search location..."
          style={{
            width: "300px",
            height: "40px",
            margin: "10px",
            padding: "10px",
          }}
        />
      </Autocomplete>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={(map) => setMap(map)}
      >
        {/* Default Markers */}
        {locations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
        ))}

        {/* User's Current Location Marker */}
        {currentLocation && <Marker position={currentLocation} label="You" />}

        {/* Search Location Marker */}
        {searchLocation && <Marker position={searchLocation} label="Searched" />}

        {/* Directions API */}
        <DirectionsService
          options={{
            origin: { lat: 28.7041, lng: 77.1025 }, // Delhi
            destination: { lat: 28.5355, lng: 77.3910 }, // Noida
            travelMode: "DRIVING",
          }}
          callback={(result) => result !== null && setDirections(result)}
        />

        {directions && <DirectionsRenderer directions={directions} />}

        {/* Traffic Layer */}
        <TrafficLayer autoRefresh />

        {/* Distance Matrix API */}
        <DistanceMatrixService
          options={{
            origins: [{ lat: 28.7041, lng: 77.1025 }],
            destinations: [{ lat: 28.5355, lng: 77.3910 }],
            travelMode: "DRIVING",
          }}
          callback={(response) => setDistanceData(response.rows[0].elements[0])}
        />
      </GoogleMap>

      {/* Distance and Duration Display */}
      {distanceData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Distance & Duration</h2>
          <p>Distance: {distanceData.distance.text}</p>
          <p>Duration: {distanceData.duration.text}</p>
        </div>
      )}
    </div>
  );
};

export default MapPage;


