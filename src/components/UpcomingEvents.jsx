import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaClock,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const UpcomingEvents = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [eventType, setEventType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const fetchEvents = (search, type) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (type) params.append("eventType", type);
    if (search) params.append("search", search);

    fetch(
      `https://assignment-eleven-chi.vercel.app/api/events/upcoming?${params.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Slice only on homepage, else show all
        if (location.pathname === "/") {
          setEvents(data.slice(0, 6));
        } else {
          setEvents(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        toast.error("Failed to load events. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents(debouncedSearchTerm, eventType);
  }, [debouncedSearchTerm, eventType, location.pathname]);

  const eventTypes = ["", "Artificial Intelligence", "Cybersecurity", "Blockchain", "Startups", "Green Technology"];

  return (
    <section className="md:py-12 py-7 bg-gray-50">
      <div className="ccc max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3 text-orange-600">
          Upcoming Events
        </h2>
        <p className="text-gray-600 text-center md:mb-10 mb-6 max-w-2xl mx-auto">
          Join our exciting lineup of upcoming events. Find something that
          interests you!
        </p>


        {location.pathname !== "/" && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <select
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "" ? "All Event Types" : type}
                </option>
              ))}
            </select>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Search by event name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
          {loading ? (
            <div className="text-center col-span-full py-16">
              <p className="text-lg text-gray-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center col-span-full py-16">
              <p className="text-lg text-gray-600">No events found.</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 min-h-[500px] flex flex-col"
                style={{
                  transform:
                    hoveredCard === event._id ? "translateY(-8px)" : "none",
                  boxShadow:
                    hoveredCard === event._id
                      ? "0 15px 30px rgba(0,0,0,0.12)"
                      : "0 4px 12px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={() => setHoveredCard(event._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative">
                  <img
                    src={
                      event.thumbnailUrl ||
                      "https://assignment-eleven-chi.vercel.app/api/placeholder/400/240"
                    }
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Free
                  </div>
                </div>

                <div className="p-6 pb-4 flex flex-col flex-grow">
                  <div className="flex items-center mb-2">
                    <FaTag className="text-orange-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">
                      {event.eventType}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-orange-600 mr-2" />
                      <span className="text-gray-700">
                        {new Date(event.eventDate).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaClock className="text-orange-600 mr-2" />
                      <span className="text-gray-700">
                        {new Date(event.eventDate).toLocaleTimeString("en-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-orange-600 mr-2" />
                      <span className="text-gray-700">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex-grow" />

                  <Link
                    to={`/events/${event._id}`}
                    className="w-full py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    View More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
