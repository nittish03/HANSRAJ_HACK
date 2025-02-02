"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

// Fix for missing marker icons
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=21612&format=png&color=000000", // Make sure this is available in public/
  iconSize: [41, 41],
  iconAnchor: [41, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://img.icons8.com/?size=100&id=21612&format=png&color=000000",
  shadowSize: [41, 41],
});

const PollutionMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pollutionData, setPollutionData] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    const fetchPollutionData = async () => {
      const apiKey = "eaa49a4b01b58bc2d26e2b713fdcc0ddb8de4182"; // Get it from waqi.info (Free)
      const cities = [{ name: "Delhi", lat: 28.6139, lon: 77.2090 }];

      const results = await Promise.all(
        cities.map(async (city) => {
          const response = await axios.get(
            `https://api.waqi.info/feed/geo:${city.lat};${city.lon}/?token=${apiKey}`
          );
          return { ...city, aqi: response.data.data.aqi || "N/A" };
        })
      );

      setPollutionData(results);
    };

    fetchPollutionData();
  }, []);

  const getRoute = async () => {
    if (!userLocation || !searchLocation) return;

    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${searchLocation[1]},${searchLocation[0]}?geometries=geojson`
    );

    setRoute(response.data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className=" w-full h-screen mt-20">
      <div className="absolute ml-10 z-50 mt-14 bg-white p-3 rounded shadow-md">
        <input
          type="text"
          placeholder="Search a location..."
          className="border p-2 text-black"
          onBlur={async (e) => {
            const query = e.target.value;
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );

            if (response.data.length > 0) {
              setSearchLocation([
                parseFloat(response.data[0].lat),
                parseFloat(response.data[0].lon),
              ]);
            }
          }}
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={getRoute}>
          Get Route
        </button>
      </div>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full mt-20 -z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {pollutionData.map((city, index) => (
          <Marker key={index} position={[city.lat, city.lon]} icon={customIcon}>
            <Popup>
              <strong>{city.name}</strong> <br />
              AQI: {city.aqi}
            </Popup>
          </Marker>
        ))}

        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default PollutionMap;    