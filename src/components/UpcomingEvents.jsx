import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/events/upcoming")
      .then((res) => res.json())
      .then((data) => setEvents(data.slice(0, 6)))
      .catch((error) => console.error("Error loading events:", error));
  }, []);

  return (
    <section className="md:py-12 py-7 bg-gray-50">
      <div className="ccc">
        <h2 className="text-4xl font-bold text-center mb-3 text-orange-600">
          Upcoming Events
        </h2>
        <p className="text-gray-600 text-center md:mb-10 mb-6 max-w-2xl mx-auto">
          Join our exciting lineup of upcoming events. Find something that
          interests you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 min-h-[500px] flex flex-col"
              style={{
                transform:
                  hoveredCard === event.id ? "translateY(-8px)" : "none",
                boxShadow:
                  hoveredCard === event.id
                    ? "0 15px 30px rgba(0,0,0,0.12)"
                    : "0 4px 12px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative">
                <img
                  src={event.thumbnail || "/api/placeholder/400/240"}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.entry_fee > 0 ? `৳${event.entry_fee}` : "Free"}
                </div>
              </div>

              <div className="p-6 pb-4 flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                  <FaTag className="text-orange-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    {event.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
                  {event.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-orange-600 mr-2" />
                    <span className="text-gray-700">{event.date}</span>
                  </div>

                  <div className="flex items-center">
                    <FaClock className="text-orange-600 mr-2" />
                    <span className="text-gray-700">
                      {event.time || "7:00 PM"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-orange-600 mr-2" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                </div>

                <div className="flex-grow" />

                <Link
                  to={`/events/${event.id}`}
                  className="w-full py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  View More <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">Loading events...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
