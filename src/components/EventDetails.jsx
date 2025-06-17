import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag,
  FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://assignment-eleven-chi.vercel.app/api/events/${id}`);
      if (!res.ok) throw new Error("Event not found");
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      console.error(error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  fetchEvent();
}, [id]);

  useEffect(() => {
    if (event) {
      document.title = `${event.name} | Evenzy`;
    }
  }, [event]);

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please enter your name and email.");
      return;
    }

    try {
      const res = await fetch("https://assignment-eleven-chi.vercel.app/api/join-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event._id, name, email }),
      });

      if (!res.ok) throw new Error("Failed to join");

      toast.success("Seat reserved successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      toast.error("Internal server error. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

if (!event) {
  return (
    <div className="text-center text-red-500 mt-4">
      Event not found
    </div>
  );
}

  if (event === null) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-10">
          <img src="/error.svg" className="max-w-[70vw] max-h-[50vh]" />
          <p className="text-lg text-gray-600 mb-2 pt-10">Event not found!</p>
          <Link
            to="/events"
            className="inline-flex items-center text-white hover:underline px-4 py-1 bg-orange-600 rounded-full"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="px-4 pt-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-orange-600 hover:underline mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Events
        </Link>

        <img
          src={event.thumbnail || "https://assignment-eleven-chi.vercel.app/api/placeholder/800x400"}
          alt={event.name}
          className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover rounded-xl mb-4"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {event.name}
        </h1>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 text-gray-600 text-sm mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <FaCalendarAlt className="mr-1 text-orange-600" />
            {event.date}
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <FaClock className="mr-1 text-orange-600" />
            {event.time || "7:00 PM"}
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-orange-600" />
            {event.location}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center text-sm mb-6 gap-2 sm:gap-4">
          <div className="flex items-center">
            <FaTag className="mr-1 text-orange-600" />
            <span>Category: {event.category}</span>
          </div>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold w-fit">
            {event.entry_fee > 0 ? `৳${event.entry_fee}` : "Free"}
          </div>
        </div>

        <p className="text-gray-700 mb-8 leading-relaxed text-base sm:text-lg">
          {event.description}
        </p>

        {event.speakers?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Speakers
            </h2>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="flex flex-col items-center w-24">
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-500 mb-2"
                  />
                  <p className="text-gray-800 text-center text-sm font-medium">
                    {speaker.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Reserve Your Seat
          </h2>
          <form
            onSubmit={handleReserve}
            className="flex flex-col sm:flex-row sm:items-end gap-4"
          >
            <div className="flex flex-col w-full sm:w-1/3">
              <label className="text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col w-full sm:w-1/3">
              <label className="text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your Email"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Reserve Seat
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetails;
