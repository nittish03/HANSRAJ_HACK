"use client";
import { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, Marker, TrafficLayer, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useAppContext } from "@/context";

const libraries = ["places"];

const MapComponent = () => {
  const { location, state, setState } = useAppContext();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [pollutionData, setPollutionData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [healthcareData, setHealthcareData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (!state) return;

    const fetchData = async () => {
      try {
        const pollutionResponse = await axios.get(
          `https://api.waqi.info/feed/geo:${location?.latitude || 28.6139};${location?.longitude || 77.2090}/?token=YOUR_API_KEY`
        );
        setPollutionData([
          {
            name: state,
            lat: location?.latitude || 28.6139,
            lon: location?.longitude || 77.2090,
            aqi: pollutionResponse.data.data.aqi,
            description: pollutionResponse.data.data.dominentpol,
          },
        ]);

        const fetchCategoryData = async (query) => {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}+near+${state}`);
          return response.data.map((loc) => ({
            name: loc.display_name,
            lat: parseFloat(loc.lat),
            lon: parseFloat(loc.lon),
          }));
        };

        setTransportData(await fetchCategoryData("metro station"));
        setHealthcareData(await fetchCategoryData("hospital"));
        setSchoolData(await fetchCategoryData("school"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state]);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      
      if (!place.geometry || !place.geometry.location) {
        console.error("Selected place has no geometry data");
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        console.error("Invalid latitude or longitude values");
        return;
      }

      setSearchLocation({ lat, lng });
      setState(place.formatted_address); // Updating the state with the searched place
    }
  };

  // Marker color customization based on category
  const getMarkerIcon = (category) => {
    switch (category) {
      case "pollution":
        return { url: "https://maps.gstatic.com/mapfiles/ms2/micons/firedept.png", scaledSize: new window.google.maps.Size(40, 40) }; // Red icon for pollution
      case "transport":
        return { url: "https://maps.gstatic.com/mapfiles/ms2/micons/rail.png", scaledSize: new window.google.maps.Size(40, 40) }; // Green icon for transport
      case "healthcare":
        return { url: "https://maps.gstatic.com/mapfiles/ms2/micons/hospitals.png", scaledSize: new window.google.maps.Size(40, 40) }; // Yellow icon for healthcare
      case "school":
        return { url: "https://maps.gstatic.com/mapfiles/ms2/micons/schools.png", scaledSize: new window.google.maps.Size(40, 40) }; // Blue icon for schools
      default:
        return { url: "https://img.icons8.com/?size=100&id=SW3XuuLGhOrk&format=png&color=000000", scaledSize: new window.google.maps.Size(40, 40) }; // Red icon for user location
    }
  };

  return (
    <div className="relative h-[91vh]">
      {isLoaded && (
        <>
          <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Search location..."
              className="absolute top-4 right-4 border border-black z-10 p-2 bg-white rounded text-black w-80"
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={searchLocation || { lat: location?.latitude || 28.6139, lng: location?.longitude || 77.2090 }}
            zoom={12}
          >
            <TrafficLayer />

            {/* Pollution Markers */}
            {/* {pollutionData.map((hotspot, index) => (
              <Marker
                key={index}
                position={{ lat: hotspot.lat, lng: hotspot.lon }}
                icon={getMarkerIcon("pollution")}
              />
            ))} */}

            {/* Transport Markers */}
            {transportData.map((loc, index) => (
              <Marker
                key={index}
                position={{ lat: loc.lat, lng: loc.lon }}
                icon={getMarkerIcon("transport")}
              />
            ))}

            {/* Healthcare Markers */}
            {healthcareData.map((loc, index) => (
              <Marker
                key={index}
                position={{ lat: loc.lat, lng: loc.lon }}
                icon={getMarkerIcon("healthcare")}
              />
            ))}

            {/* School Markers */}
            {schoolData.map((loc, index) => (
              <Marker
                key={index}
                position={{ lat: loc.lat, lng: loc.lon }}
                icon={getMarkerIcon("school")}
              />
            ))}

            {/* User Location */}
            {location && (
              <Marker
                position={{ lat: location.latitude, lng: location.longitude }}
                icon={getMarkerIcon("user")}
              />
            )}
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default MapComponent;
