import { useState, useEffect } from "react";
import MapView from "./Mapview";


const Mapinput= () => {
  const [listingData, setListingData] = useState([]);
  const [crimeType, setCrimeType] = useState("cyber");

  const fetchCrimeData = async () => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crimeType }),
      });
      const data = await response.json();
      setListingData(data);
    } catch (error) {
      console.error("Error fetching crime data:", error);
    }
  };

  useEffect(() => {
    fetchCrimeData();
  }, [crimeType]);

  return (
    <div className="w-full h-screen">
    
      <MapView listingData={listingData} />
    </div>
  );
};

export default Mapinput;
