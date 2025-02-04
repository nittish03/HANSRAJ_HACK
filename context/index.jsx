'use client';
import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
console.log(location)
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    setLocationError(err.message);
                    toast.error("Failed to get location: " + err.message);
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
            toast.error("Geolocation is not supported by your browser.");
        }
    }, []);



    return (
        <AppContext.Provider value={{
            location,
            locationError,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
