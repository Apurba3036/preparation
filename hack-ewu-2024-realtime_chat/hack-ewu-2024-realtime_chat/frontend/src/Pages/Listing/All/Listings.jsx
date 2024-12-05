import axios from "axios";
import { useEffect, useState } from "react";
import MapMode from "./MapMode";

const Listings = () => {
  const [viewMode, setViewModel] = useState("map");

  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await axios.get(`http://localhost:3000/api/room`);
      setListingData(res.data);
    };
    get();
  }, []);

  return (
    <div>
      <MapMode listingData={listingData} />
    </div>
  );
};
export default Listings;
