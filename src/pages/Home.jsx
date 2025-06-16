import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventSlider from "../components/EventSlider";
import UpcomingEvents from "../components/UpcomingEvents";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqAccordion from "../components/FaqAccordion";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Evenzy";
  }, []);

  return (
    <div>
      <Navbar />
      <EventSlider />
      <UpcomingEvents />
      <AboutSection />
      <TestimonialsSection />
      <FaqAccordion />
      <Footer />
    </div>
  );
};

export default Home;
