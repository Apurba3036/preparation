import React, { useState, useEffect } from "react";
import axios from "axios"; // For sending the data to your backend
import CreateListingForm from "./CreateListingForm";
import MapView from "./MapView";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    city: "",
    country: "",
  });

  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 23.8693275,
    lon: 90.3926893,
  });

  const [position, setPosition] = useState(null); // Add state for position

  // This function updates formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch latitude and longitude from Geoapify API when location data changes
  useEffect(() => {
    if (query) {
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${query}&format=json&apiKey=f406d8d33f364287a7cac97270576411`
      )
        .then((response) => response.json())
        .then((result) => {
          const newCoordinates = {
            lat: result.results[0].lat,
            lon: result.results[0].lon,
          };
          setCoordinates(newCoordinates);
          setPosition(newCoordinates); // Update position for the map
          console.log(newCoordinates);
        })
        .catch((error) => console.log("Error fetching coordinates:", error));
    }
  }, [query]);

  // Update the query based on formData changes
  useEffect(() => {
    if (formData.area && formData.location) {
      setQuery(
        `${formData.location}, ${formData.area}, ${formData.city}, ${formData.country}`
      );
    }
  }, [formData]);

  // Send form data along with coordinates to the backend on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        lat: coordinates.lat,
        lon: coordinates.lon,
      };

      // Sending the data to the backend (Node.js)
      const response = await axios.post("http://localhost:3000/api/complaint", dataToSend);
      alert("Complaint reported successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error reporting complaint!");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left Side Form */}
      <div className="w-full">
        <CreateListingForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Right Side Map */}
      <div className="w-full h-[400px] lg:h-[800px]">
        <MapView coordinates={coordinates} position={position} setPosition={setPosition} />
      </div>
    </div>
  );
};

export default CreateListing;
