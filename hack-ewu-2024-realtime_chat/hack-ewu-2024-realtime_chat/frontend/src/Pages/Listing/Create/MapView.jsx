import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const iconDesign = {
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
};

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng); 
    },
  });

  if (!position) return null;

  console.log("Position inside LocationMarker:", position);  

  return (
    <Marker position={position} icon={L.icon(iconDesign)}>
      <Popup>
        Latitude: {position.lat ? position.lat.toFixed(4) : "N/A"}
        <br />
        Longitude: {position.lng ? position.lng.toFixed(4) : "N/A"}
      </Popup>
    </Marker>
  );
};

const Map = ({ coordinates, position, setPosition }) => {
  const mapRef = useRef(null);

  console.log("Position inside Map:", position);  // Debug

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(coordinates, 16, mapRef.current.getZoom());
    }
  }, [coordinates]);

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      className="container z-0"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
};

export default Map;
