"use client";
import { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];

const PollutionMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [pollutionData, setPollutionData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [healthcareData, setHealthcareData] = useState([]);
  const [clickedLocationData, setClickedLocationData] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

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
    const fetchPollutionData = async () => {
      const apiKey = "eaa49a4b01b58bc2d26e2b713fdcc0ddb8de4182";
      const response = await axios.get(
        `https://api.waqi.info/feed/geo:28.6139;77.2090/?token=${apiKey}`
      );
      setPollutionData([
        {
          name: "Delhi",
          lat: 28.6139,
          lon: 77.2090,
          aqi: response.data.data.aqi,
          description: response.data.data.dominentpol,
        },
      ]);
    };

    const fetchTransportData = async () => {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=metro+station+near+Delhi`
      );
      setTransportData(response.data.map((loc) => ({
        name: loc.display_name,
        lat: parseFloat(loc.lat),
        lon: parseFloat(loc.lon),
      })));
    };

    const fetchHealthcareData = async () => {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=hospital+near+Delhi`
      );
      setHealthcareData(response.data.map((loc) => ({
        name: loc.display_name,
        lat: parseFloat(loc.lat),
        lon: parseFloat(loc.lon),
      })));
    };

    fetchPollutionData();
    fetchTransportData();
    fetchHealthcareData();
  }, []);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [78.9629, 20.5937],
      zoom: 5,
    });

    pollutionData.forEach((hotspot) => {
      new maplibregl.Marker({ color: "red" })
        .setLngLat([hotspot.lon, hotspot.lat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<strong>${hotspot.name}</strong><br/>AQI: ${hotspot.aqi}<br/>Pollutant: ${hotspot.description}`
          )
        )
        .addTo(map);
    });

    transportData.forEach((loc) => {
      new maplibregl.Marker({ color: "green" })
        .setLngLat([loc.lon, loc.lat])
        .setPopup(new maplibregl.Popup().setText(`${loc.name} (Transport)`))
        .addTo(map);
    });

    healthcareData.forEach((loc) => {
      new maplibregl.Marker({ color: "blue" })
        .setLngLat([loc.lon, loc.lat])
        .setPopup(new maplibregl.Popup().setText(`${loc.name} (Healthcare)`))
        .addTo(map);
    });

    if (currentLocation) {
      new maplibregl.Marker({ color: "blue" })
        .setLngLat([currentLocation.lon, currentLocation.lat])
        .setPopup(new maplibregl.Popup().setText("Your Location"))
        .addTo(map);
    }

    return () => map.remove();
  }, [pollutionData, transportData, healthcareData, currentLocation]);

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
    <div className="relative w-full h-screen text-black">
      {isLoaded && (
        <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search location..."
            className="absolute top-4 left-4 z-10 p-2 bg-white rounded text-black"
          />
        </Autocomplete>
      )}
      <div id="map" className="w-full h-full" />
      {clickedLocationData && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg text-black">
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