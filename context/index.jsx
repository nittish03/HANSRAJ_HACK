'use client';
import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [watchId, setWatchId] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const id = navigator.geolocation.watchPosition(
                (position) => {
                    if (position.coords.accuracy < 1000) {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                        });
                    } else {
                        console.warn("Low accuracy, ignoring this location update.");
                    }
                },
                (err) => {
                    setLocationError(err.message);
                    toast.error("Failed to get location: " + err.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
            setWatchId(id);
        } else {
            setLocationError("Geolocation is not supported by this browser.");
            toast.error("Geolocation is not supported by your browser.");
        }

        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
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