import { Outlet } from "react-router-dom";
import Footer from "../Pages/SharedPages/Footer";
import Navbar from "../Pages/SharedPages/Navbar";
import Chatbot from "../components/Chatbot/Chatbot";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Chatbot />
    </div>
  );
};

export default Main;
