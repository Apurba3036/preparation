import { useEffect, useState } from "react";
import { FaCogs, FaDollarSign, FaUtensils } from "react-icons/fa"; // Importing React icons
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const [room, setRoom] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/room/${id}`)
      .then((res) => res.json())
      .then((data) => setRoom(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, [id]);

  console.log(room);

  return (
    <div className="container mx-auto p-5">
      <div
        className="hero h-96 md:h-[30rem]"
        style={{ backgroundImage: `url(${room.image})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content">
          <div className="p-5 mt-10 text-center">
            <h1 className="mb-5 text-5xl font-bold">{room.title}</h1>
            <p className="mb-5">Explore the details of our room</p>
          </div>
        </div>
      </div>
      {/* Content section */}
      <div className="md:flex mt-10 gap-10">
        {/* Left side: Image */}
        <div className="md:w-1/2 mb-5 md:mb-0">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-1/2 bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{room.title}</h2>
          <p className="mb-4 text-gray-700 text-justify">{room.description}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaCogs className="text-blue-500" />
              Area
            </h3>
            <p className="text-gray-700">{room.area}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaUtensils className="text-green-500" />
              Facilities
            </h3>
            <p className="text-gray-700">{room.facilites}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaDollarSign className="text-yellow-500" /> Price
            </h3>
            <p className="text-gray-700">{room.price} BDT</p>
          </div>

          {/* <Link to={`/checkout/${id}`}>
            <button className="btn btn-primary w-full mt-5">Checkout</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export default RoomDetails;
