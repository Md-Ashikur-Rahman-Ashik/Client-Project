import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventSlider from "../components/EventSlider";
import UpcomingEvents from "../components/UpcomingEvents";

const Events = () => {
  useEffect(() => {
    document.title = "Events | Evenzy";
  }, []);

  return (
    <div>
      <Navbar />
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default Events;
