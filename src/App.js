import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [hemisphere, setHemisphere] = useState("");
  const [month, setMonth] = useState(() => {
    return new Date().getMonth() + 1;
  });

  function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        if (position.coords.latitude > 0) {
          setHemisphere("Northern");
        } else if (position.coords.latitude < 0) {
          setHemisphere("Southern");
        } else {
          setHemisphere("Equator");
        }
      });
    }
  }
  // Image URLs
  
  const summerImageURL = " https://source.unsplash.com/random?summer";
  const winterImageURL = "https://source.unsplash.com/random?winter";

  return (
    <div>
      <button onClick={fetchLocation}> Fetch Location </button>

      <div className="info-container">
        <h1>Latitude: {latitude}</h1>
        <h1>Longitude: {longitude}</h1>
        <h1>Hemisphere: {hemisphere}</h1>
        <h1>Month: {month}</h1>
      </div>

      {hemisphere &&
        ((hemisphere === "Northern Hemisphere" && (month >= 4 && month <= 10)) ||
          (hemisphere === "Southern Hemisphere" && (month < 4 || month > 10)) ||
          hemisphere === "Equator") && (
          <div>
            <h1> Summer Season</h1>
            <img
              src={summerImageURL}
              alt="summer"
              style={{ width: "300px", height: "auto" }} // Adjust width and height as needed
            />
          </div>
        )}

      {hemisphere &&
        ((hemisphere === "Northern Hemisphere" && (month < 4 || month > 10)) ||
          (hemisphere === "Southern Hemisphere" && (month >= 4 && month <= 10)) ||
          hemisphere === "Equator") && (
          <div>
            <h1> Winter Season</h1>
            <img
              src={winterImageURL}
              alt="winter"
              style={{ width: "300px", height: "auto" }} // Adjust width and height as needed
            />
          </div>
        )}
    </div>
  );
};

export default App;
