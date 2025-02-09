"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "@/context";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
  TrafficLayer,
  StreetViewPanorama,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw", // Full width
  height: "91vh", // Full height
  position: "absolute",
  top: 0,
  left: 0,
};

export default function MapPage() {
  const { location } = useAppContext();
  const center = location || { lat: 28.7041, lng: 77.1025 }; // Default: Delhi
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [streetView, setStreetView] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [places, setPlaces] = useState([]);

  const startRef = useRef();
  const endRef = useRef();

  // Locate user
  const locateUser = () => {
    const loading = toast.loading("Finding Location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(location);
          if (map) map.panTo(location);
          toast.dismiss(loading);
          toast.success("Location Found!");
        },
        () => {
          toast.dismiss(loading);
          toast.error("Unable to fetch location.");
        }
      );
    } else {
      toast.dismiss(loading);
      toast.error("Geolocation not supported.");
    }
  };

  // Click map to add waypoint + show clicked location
  const onMapClick = (event) => {
    const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setClickedLocation(location);
    addWaypoint(location.lat, location.lng);
    toast.info(`Waypoint Added: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`);
  };

  // Add waypoint manually
  const addWaypoint = (lat, lng) => {
    setWaypoints([...waypoints, { lat, lng }]);
  };

  // Remove waypoint on click
  const removeWaypoint = (index) => {
    setWaypoints(waypoints.filter((_, i) => i !== index));
    toast.success("Waypoint Removed!");
  };

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative bottom-14">
      {/* Floating Controls */}
      <div className="absolute top-32 left-36 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-10 flex flex-col gap-3">
        <Autocomplete>
          <input ref={startRef} placeholder="Enter start location" className="p-2 border rounded text-black" />
        </Autocomplete>
        <button onClick={locateUser} className="px-4 py-2 bg-green-500 text-white rounded">Use My Location</button>

        <Autocomplete>
          <input ref={endRef} placeholder="Enter destination" className="p-2 border rounded text-black" />
        </Autocomplete>
        <button onClick={() => {}} className="px-4 py-2 bg-blue-500 text-white rounded">Get Route</button>
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || center}
        zoom={12}
        onClick={onMapClick}
        onLoad={(map) => setMap(map)}
      >
        {userLocation && <Marker position={userLocation} title="Your Location" />}
        {clickedLocation && <Marker position={clickedLocation} title="Clicked Location" />}
        {directions && <DirectionsRenderer directions={directions} />}
        {waypoints.map((wp, idx) => (
          <Marker key={idx} position={wp} title={`Waypoint ${idx + 1}`} onClick={() => removeWaypoint(idx)} />
        ))}
        <TrafficLayer />
        {streetView && <StreetViewPanorama position={userLocation || center} />}
      </GoogleMap>

      {/* Clicked Location Info */}
      {clickedLocation && (
        <p className="absolute top-14 left-2 bg-white p-2 rounded text-black shadow-lg">
          Clicked Location: Lat {clickedLocation.lat.toFixed(4)}, Lng {clickedLocation.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}



// "use client";

// import { useState, useRef } from "react";
// import { toast } from "react-toastify";
// import { useAppContext } from "@/context";
// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   Autocomplete,
//   TrafficLayer,
//   StreetViewPanorama,
//   useLoadScript,
// } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "500px",
// };

// export default function MapPage() {
//   const { location } = useAppContext();
//   const center = location || { lat: 28.7041, lng: 77.1025 }; // Default: Delhi
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [streetView, setStreetView] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [clickedLocation, setClickedLocation] = useState(null);
//   const [waypoints, setWaypoints] = useState([]);
//   const [places, setPlaces] = useState([]);

//   const startRef = useRef();
//   const endRef = useRef();

//   // Locate user
//   const locateUser = () => {
//     const loading = toast.loading("Finding Location...");
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = { lat: position.coords.latitude, lng: position.coords.longitude };
//           setUserLocation(location);
//           if (map) map.panTo(location);
//           toast.dismiss(loading);
//           toast.success("Location Found!");
//         },
//         () => {
//           toast.dismiss(loading);
//           toast.error("Unable to fetch location.");
//         }
//       );
//     } else {
//       toast.dismiss(loading);
//       toast.error("Geolocation not supported.");
//     }
//   };

//   // Use current location as start
//   const useCurrentLocation = () => {
//     if (userLocation) {
//       startRef.current.value = "Current Location";
//     } else {
//       locateUser();
//       setTimeout(() => {
//         if (userLocation) startRef.current.value = "Current Location";
//       }, 1000);
//     }
//   };

//   // Get route with waypoints
//   const getRoute = () => {
//     if (!endRef.current.value) return toast.error("Please enter a destination!");

//     const directionsService = new google.maps.DirectionsService();
//     const routeOptions = {
//       origin: startRef.current.value === "Current Location" && userLocation ? userLocation : startRef.current.value,
//       destination: endRef.current.value,
//       waypoints: waypoints.map((wp) => ({ location: new google.maps.LatLng(wp.lat, wp.lng), stopover: true })),
//       travelMode: google.maps.TravelMode.DRIVING,
//       optimizeWaypoints: true,
//     };

//     directionsService.route(routeOptions, (result, status) => {
//       if (status === "OK") setDirections(result);
//       else toast.error("Failed to get directions.");
//     });
//   };

//   // Click map to add waypoint + show clicked location
//   const onMapClick = (event) => {
//     const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
//     setClickedLocation(location);
//     addWaypoint(location.lat, location.lng);
//     toast.info(`Waypoint Added: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`);
//   };

//   // Find nearby places
//   const findNearbyPlaces = () => {
//     if (userLocation) {
//       const service = new google.maps.places.PlacesService(map);
//       const request = {
//         location: new google.maps.LatLng(userLocation.lat, userLocation.lng),
//         radius: 5000,
//         type: ["restaurant", "gas_station", "lodging"],
//       };

//       service.nearbySearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           setPlaces(results);
//         } else {
//           toast.error("Unable to find places.");
//         }
//       });
//     } else {
//       toast.error("Please find your location first.");
//     }
//   };

//   // Add waypoint manually
//   const addWaypoint = (lat, lng) => {
//     setWaypoints([...waypoints, { lat, lng }]);
//   };

//   // Remove waypoint on click
//   const removeWaypoint = (index) => {
//     setWaypoints(waypoints.filter((_, i) => i !== index));
//     toast.success("Waypoint Removed!");
//   };

//   if (loadError) return <p>Error loading map</p>;
//   if (!isLoaded) return <p>Loading map...</p>;

//   return (
//     <div className="flex flex-col items-center min-h-[91vh] mt-16">
//       <div className="flex justify-around items-center w-full">
//         <div>
//           {/* Search Inputs */}
//           <div className="flex gap-2 mb-2">
//             <Autocomplete>
//               <input ref={startRef} placeholder="Enter start location" className="p-2 border rounded text-black" />
//             </Autocomplete>
//             <button onClick={useCurrentLocation} className="px-4 py-2 bg-green-500 text-white rounded">
//               Use My Location
//             </button>
//           </div>

//           <div className="flex gap-2 mb-4">
//             <Autocomplete>
//               <input ref={endRef} placeholder="Enter destination" className="p-2 border rounded text-black" />
//             </Autocomplete>
//             <button onClick={getRoute} className="px-4 py-2 bg-blue-500 text-white rounded">Get Route</button>
//           </div>
//         </div>

//         <div>
//           {/* Map Controls */}
//           <div className="flex gap-2 mt-4">
//             <button onClick={locateUser} className="px-4 py-2 bg-gray-600 text-white rounded">Find Me</button>
//             <button onClick={findNearbyPlaces} className="px-4 py-2 bg-purple-500 text-white rounded">
//               Find Nearby Places
//             </button>
//             <button onClick={() => setStreetView(!streetView)} className="px-4 py-2 bg-yellow-500 text-white rounded">
//               {streetView ? "Exit Street View" : "Street View"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Google Map */}
      
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={userLocation || center}
//         zoom={12}
//         onClick={onMapClick}
//         onLoad={(map) => setMap(map)}
//       >
//         {userLocation && <Marker position={userLocation} title="Your Location" />}
//         {clickedLocation && <Marker position={clickedLocation} title="Clicked Location" />}
//         {directions && <DirectionsRenderer directions={directions} />}
//         {places.map((place, idx) => (
//           <Marker key={idx} position={place.geometry.location} title={place.name} />
//         ))}
//         {waypoints.map((wp, idx) => (
//           <Marker key={idx} position={wp} title={`Waypoint ${idx + 1}`} onClick={() => removeWaypoint(idx)} />
//         ))}
//         <TrafficLayer />
//         {streetView && <StreetViewPanorama position={userLocation || center} />}
//       </GoogleMap>

//       {/* Clicked Location Info */}
//       {clickedLocation && (
//         <p className="mt-4 text-gray-600">
//           Clicked Location: Lat {clickedLocation.lat.toFixed(4)}, Lng {clickedLocation.lng.toFixed(4)}
//         </p>
//       )}

//       {/* Waypoints Info */}
//       {waypoints.length > 0 && (
//         <div className="mt-4 text-gray-600">
//           <p>Waypoints (Click to Remove):</p>
//           <ul>
//             {waypoints.map((wp, idx) => (
//               <li key={idx} className="cursor-pointer text-red-500" onClick={() => removeWaypoint(idx)}>
//                 {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
