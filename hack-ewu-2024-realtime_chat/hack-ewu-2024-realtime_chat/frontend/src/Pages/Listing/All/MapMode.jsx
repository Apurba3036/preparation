import { useEffect, useState } from "react";

import MapView from "./MapView";

const MapMode = ({listingData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 23.8693275,
    lon: 90.3926893,
  });

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${query}&format=json&apiKey=f406d8d33f364287a7cac97270576411`
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.results && result.results.length > 0) {
            setCoordinates({
              lat: result.results[0].lat,
              lon: result.results[0].lon,
            });
          } else {
            console.error("No results found for the query");
          }
          
        })
        .catch((error) => console.log("error", error));
    }
  }, [query]);
console.log(coordinates);
  return (
    <div className="flex">
 
      <div className="w-full z-10">
        <div className="w-full z-10 h-[600px] lg:h-[800px]">
          <MapView coordinates={coordinates} listingData={listingData} />
        </div>
      </div>
    </div>
  );
};
export default MapMode;
