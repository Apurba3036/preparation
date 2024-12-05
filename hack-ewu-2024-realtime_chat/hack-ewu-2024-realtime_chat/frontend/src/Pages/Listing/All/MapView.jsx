import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";


// Custom icon design for nearby places (green color)
const iconDesignGreen = new L.DivIcon({
  className: "leaflet-div-icon", // Use default class
  html: `<div style="background-color: green; width: 35px; height: 35px; border-radius: 50%; color: white; display: flex; justify-content: center; align-items: center; font-size: 16px; font-weight: bold; border: 2px solid white;">G</div>`,
  iconSize: [35, 35], // Icon size
  iconAnchor: [17, 35], // Anchor position
  popupAnchor: [0, -35], // Popup anchor
});

const iconDesign2 = {
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with your custom icon URL
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
};

const MapView = () => {
  const [complaints, setComplaints] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  // Fetch complaints from the backend
  useEffect(() => {
    fetch("http://localhost:3000/api/complaints") // Replace with your backend URL
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  // Function to fetch nearby places
  const getNearbyPlaces = async (lat, lon) => {
    console.log("Fetching nearby places for:", lat, lon); // Debugging
    try {
      const res = await fetch(
        `https://api.geoapify.com/v2/places?categories=education,commercial.food_and_drink,public_transport.bus,commercial.supermarket,commercial.marketplace,commercial.shopping_mall,commercial.stationery,education.library,public_transport,healthcare.pharmacy,healthcare.hospital,leisure.park&filter=circle:${lon},${lat},1000&bias=proximity:${lon},${lat}&limit=20&apiKey=f406d8d33f364287a7cac97270576411`
      );
      const data = await res.json();
      setNearbyPlaces(data.features || []);
      console.log("Nearby Places:", data.features);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  // Handle AI Analysis Button Click (You can customize this)
  const handleAIAnalysis = (locationDetails) => {
    console.log("Performing AI Analysis on:", locationDetails);
    // Add AI-related functionality here
  };

  return (
    <MapContainer
      center={[23.8693275, 90.3926893]} // Default center
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Render complaints markers */}
      {complaints.map((complaint, index) => (
        <Marker
          key={index}
          position={[complaint.lat, complaint.lon]}
          icon={L.icon(iconDesign2)}
        >
          <Popup>
            <div>
              <strong>Location:</strong> {complaint.location} <br />
              <strong>Area:</strong> {complaint.area} <br />
              <strong>City:</strong> {complaint.city} <br />
              <strong>Country:</strong> {complaint.country} <br />
              <button
                style={{ margin: "5px", padding: "5px" }}
                onClick={() => getNearbyPlaces(complaint.lat, complaint.lon)}
              >
                Find Nearby Gov Places
              </button>
              <button
                style={{ margin: "5px", padding: "5px" }}
                onClick={() => handleAIAnalysis(complaint)}
              >
                AI Analysis
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render nearby places markers (Green) */}
      {nearbyPlaces.map((data, index) => (
        <Marker
          key={index}
          position={{
            lat: data.properties.lat,
            lon: data.properties.lon,
          }}
          icon={iconDesignGreen} // Green icon
        >
          <Popup>
            <div>
              <p>
                {data.properties.name
                  ? data.properties.name
                  : data.properties.formatted}
              </p>
            </div>
            <Link
              href={`https://www.google.com/maps?q=${data.properties.lat},${data.properties.lon}&z=18`}
              className="btn-link"
              target="_blank"
            >
              View Details information about this location from Google Maps.
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
