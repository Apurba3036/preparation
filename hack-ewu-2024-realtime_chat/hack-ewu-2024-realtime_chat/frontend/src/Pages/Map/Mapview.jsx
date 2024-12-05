import { useEffect, useState, useRef } from "react";
import maplibregl, { Marker } from "maplibre-gl";

const listingData = [
  { id: 1, area: "Gulshan", coordinates: [90.4203, 23.7975], score: 100, crimeType: "Cyber" },
  { id: 2, area: "Dhanmondi", coordinates: [90.3750, 23.7465], score: 50, crimeType: "Theft" },
  { id: 3, area: "Uttara", coordinates: [90.4000, 23.8750], score: 60, crimeType: "Rape" },
  { id: 4, area: "Banani", coordinates: [90.4045, 23.7941], score: 85, crimeType: "Cyber" },
  { id: 5, area: "Farmgate", coordinates: [90.3926, 23.7525], score: 40, crimeType: "Robbery" },
];

const MapView = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCrimeType, setSelectedCrimeType] = useState("All");
  const mapRef = useRef(null);
  const markersRef = useRef([]); // To keep track of markers
  const [userLocation, setUserLocation] = useState([90.4125, 23.8103]); // Default to Dhaka center

  // Filter data based on crime type
  const filteredData = selectedCrimeType === "All"
    ? listingData
    : listingData.filter((item) => item.crimeType === selectedCrimeType);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: "map",
        style: "https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=f406d8d33f364287a7cac97270576411",
        center: userLocation, // Set the initial center to user's location
        zoom: 10,
      });

      // Handle map load event
      mapRef.current.on("load", () => {
        // Add current location marker
        const userMarker = new Marker()
          .setLngLat(userLocation)
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML("<h3>Your Location</h3>"))
          .addTo(mapRef.current);

        // Add heatmap layer
        mapRef.current.addSource("heatmap-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        mapRef.current.addLayer({
          id: "heatmap-layer",
          type: "heatmap",
          source: "heatmap-data",
          paint: {
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "score"],
              0,
              0,
              50,
              0.5,
              100,
              1,
            ],
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              15,
              3,
            ],
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(255, 204, 204, 0)", // Very light red (transparent)
              0.2,
              "rgb(255, 102, 102)", // Light red
              0.4,
              "rgb(255, 51, 51)", // Medium red
              0.6,
              "rgb(255, 0, 0)", // Strong red
              0.8,
              "rgb(204, 0, 0)", // Dark red
              1,
              "rgb(153, 0, 0)", // Very dark red
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["get", "score"],
              0,
              10,
              50,
              25,
              100,
              50,
            ],
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              15,
              0,
            ],
          },
        });

        // Add markers based on filtered data
        filteredData.forEach((item) => {
          const marker = new Marker()
            .setLngLat(item.coordinates)
            .setPopup(
              new maplibregl.Popup({ offset: 25 }).setHTML(`
                <h3>${item.area}</h3>
                <p>Crime Type: ${item.crimeType}</p>
                <p>Score: ${item.score}</p>
              `)
            )
            .addTo(mapRef.current);

          markersRef.current.push(marker);
        });
      });
    } else {
      // Update the heatmap data based on filteredData
      const source = mapRef.current.getSource("heatmap-data");
      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: filteredData.map((item) => ({
            type: "Feature",
            properties: { score: item.score },
            geometry: { type: "Point", coordinates: item.coordinates },
          })),
        });
      }

      // Remove old markers before adding new ones
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = []; // Clear the markers array

      // Add new markers based on filteredData
      filteredData.forEach((item) => {
        const marker = new maplibregl.Marker()
          .setLngLat(item.coordinates)
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(`
              <h3>${item.area}</h3>
              <p>Crime Type: ${item.crimeType}</p>
              <p>Score: ${item.score}</p>
            `)
          )
          .addTo(mapRef.current);

        markersRef.current.push(marker);
      });
    }
  }, [filteredData, userLocation]);

  const handleSearch = () => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${searchLocation}&apiKey=f406d8d33f364287a7cac97270576411`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.features.length > 0) {
          const [lon, lat] = data.features[0].geometry.coordinates;
          mapRef.current.setCenter([lon, lat]);
          mapRef.current.setZoom(12);
          setUserLocation([lon, lat]); // Update user location when search is successful
        } else {
          alert("Location not found!");
        }
      })
      .catch((error) => {
        console.error("Error searching location:", error);
      });
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <input
          type="text"
          placeholder="Search location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
        <select
          value={selectedCrimeType}
          onChange={(e) => setSelectedCrimeType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Types</option>
          <option value="Cyber">Cyber</option>
          <option value="Theft">Theft</option>
          <option value="Rape">Rape</option>
          <option value="Robbery">Robbery</option>
        </select>
      </div>
      <div id="map" className="w-full h-full"></div>
    </div>
  );
};

export default MapView;
