import { useState, useEffect } from "react";

/**
 * @typedef {Object} GeoLocation
 * @property {number} latitude - Latitude coordinate of the user
 * @property {number} longitude - Longitude coordinate of the user
 */

/**
 * Hook which lets you get the Geolocation from your browser.
 * @param {boolean} throwErrIfUnsupported throw an error if unable to use geolocation.
 * @returns {GeoLocation} Object containing the latitude and longitude of the user.
 */
export default function useGeoLocation(throwErrIfUnsupported = false) {
  const [geoLocation, setGeoLocation] = useState({});
  useEffect(() => {
    if (!navigator.geolocation) {
      if (throwErrIfUnsupported)
        throw new Error("The browser does not support geolocation");
      else return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return geoLocation;
}
