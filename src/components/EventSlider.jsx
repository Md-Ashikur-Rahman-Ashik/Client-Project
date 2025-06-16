import { useEffect, useState, useRef } from "react";

const EventSlider = () => {
  const [events, setEvents] = useState([]);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  useEffect(() => {
    if (!carouselRef.current || events.length === 0) return;

    const carousel = carouselRef.current;
    let index = 0;

    intervalRef.current = setInterval(() => {
      index = (index + 1) % events.length;
      const slideWidth = carousel.offsetWidth;
      carousel.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [events]);

  return (
    <div className="w-screen overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-all duration-500 overflow-x-hidden scroll-smooth"
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 relative"
            style={{ width: "100vw" }}
          >
            <img
              src={event.thumbnail}
              alt={event.name}
              className="w-full object-cover"
            />
            <div className="absolute md:pl-19 bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p className="text-sm">
                {event.date} | {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSlider;
