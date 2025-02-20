"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "@/context";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
  TrafficLayer,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { location } = useAppContext();
  const defaultCenter = location || { lat: 28.7041, lng: 77.1025 }; // Default: Delhi
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocations, setClickedLocations] = useState([]);
  const [isSatellite, setIsSatellite] = useState(false);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          if (map) {
            map.panTo(location);
            fetchNearbyHospitals(location);
          }
        },
        () => {
          toast.error("Unable to fetch location.");
        }
      );
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  const fetchNearbyHospitals = (location) => {
    if (!window.google || !window.google.maps || !map) return;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location,
      radius: 5000,
      type: ["hospital", "clinic"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setNearbyHospitals(results);
      } else {
        toast.error("No hospitals found nearby.");
      }
    });
  };

  const onMapClick = (event) => {
    const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setClickedLocations((prev) => [...prev, location]);
    toast.info("Waypoint/Destination Added");
  };

  const onMarkerClick = (location) => {
    setClickedLocations((prev) => {
      const newLocations = prev.filter((loc) => loc.lat !== location.lat || loc.lng !== location.lng);

      if (newLocations.length === 0) {
        setDirections(null); // Clear route if all waypoints are removed
      }

      return newLocations;
    });

    toast.info("Waypoint Removed");
  };

  const getRoute = () => {
    if (!window.google || !window.google.maps) {
      return toast.error("Google Maps API not loaded correctly.");
    }

    const directionsService = new google.maps.DirectionsService();
    const startPoint = userLocation || defaultCenter;

    if (!clickedLocations.length) {
      return toast.error("Please select a destination!");
    }

    const waypoints = clickedLocations.slice(0, -1).map((wp) => ({ location: wp, stopover: true }));
    const destination = clickedLocations[clickedLocations.length - 1];

    const routeOptions = {
      origin: startPoint,
      destination,
      waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    };

    directionsService.route(routeOptions, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
        toast.success("Route found!");
      } else {
        toast.error("Failed to get directions.");
      }
    });
  };

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div>
      <div className="absolute top-40 left-4 z-10 bg-white p-4 rounded-lg shadow-lg flex flex-col">
        <Autocomplete
          onLoad={(auto) => (startRef.current = auto)}
          onPlaceChanged={() => {
            const place = startRef.current.getPlace();
            if (place.geometry) {
              setUserLocation({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });
            }
          }}
        >
          <input
            placeholder="Enter start location"
            className="p-2 border rounded text-black w-64"
          />
        </Autocomplete>

        <Autocomplete
          onLoad={(auto) => (endRef.current = auto)}
          onPlaceChanged={() => {
            const place = endRef.current.getPlace();
            if (place.geometry) {
              const destination = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };
              setClickedLocations([destination]); // Set final destination
            }
          }}
        >
          <input
            placeholder="Enter destination"
            className="p-2 border rounded text-black w-64"
          />
        </Autocomplete>

        <button onClick={getRoute} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">Get Route</button>
        <button onClick={() => setIsSatellite((prev) => !prev)} className="px-4 py-2 bg-gray-500 text-white rounded mt-2">
          {isSatellite ? "Switch to Default Mode" : "Switch to Satellite Mode"}
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={{ ...mapOptions, mapTypeId: isSatellite ? "hybrid" : "roadmap" }}
        center={userLocation || defaultCenter}
        zoom={12}
        onClick={onMapClick}
        onLoad={(mapInstance) => {
          setMap(mapInstance);
          if (userLocation) {
            fetchNearbyHospitals(userLocation);
          }
        }}
      >
        {userLocation && <Marker position={userLocation} title="Your Location" />}
        {clickedLocations.map((loc, idx) => (
          <Marker key={idx} position={loc} title={`Waypoint ${idx + 1}`} onClick={() => onMarkerClick(loc)} />
        ))}
        {nearbyHospitals.map((place, idx) => (
          <Marker key={idx} position={place.geometry.location} title={place.name} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
        <TrafficLayer />
      </GoogleMap>
    </div>
  );
}
