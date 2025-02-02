"use client";
import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const PollutionMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [pollutionData, setPollutionData] = useState([]);
  const [clickedLocationData, setClickedLocationData] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distanceData, setDistanceData] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [78.9629, 20.5937],
      zoom: 5,
    });

    pollutionData.forEach((hotspot) => {
      const markerElement = document.createElement("div");
      markerElement.style.backgroundColor = getMarkerColor(hotspot.aqi);
      markerElement.style.width = "15px";
      markerElement.style.height = "15px";
      markerElement.style.borderRadius = "50%";

      new maplibregl.Marker(markerElement)
        .setLngLat([hotspot.lon, hotspot.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<strong>${hotspot.name}</strong><br/>AQI: ${hotspot.aqi}<br/>Pollutant: ${hotspot.description}`
          )
        )
        .addTo(map);
    });

    if (currentLocation) {
      new maplibregl.Marker({ color: "blue" })
        .setLngLat([currentLocation.lon, currentLocation.lat])
        .setPopup(new maplibregl.Popup().setText("Your Location"))
        .addTo(map);
    }

    return () => map.remove();
  }, [pollutionData, currentLocation]);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setSearchLocation({
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {isLoaded && (
        <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search location..."
            className="absolute top-4 left-4 z-10 p-2 bg-white rounded"
          />
        </Autocomplete>
      )}
      <div id="map" className="w-full h-full" />
      {clickedLocationData && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          <strong className="block text-lg">Clicked Location</strong>
          <p>Name: {clickedLocationData.name}</p>
          <p>AQI: {clickedLocationData.aqi}</p>
          <p>Pollutant: {clickedLocationData.description}</p>
        </div>
      )}
    </div>
  );
};

export default PollutionMap;
