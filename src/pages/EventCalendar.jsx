import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    document.title = "Calendar | Evenzy";
  }, []);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setLoading(false);
      });
  }, []);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const renderCalendarDays = () => {
    const startDay = getStartDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const calendarDays = [];
    const eventDates = events.map((event) => ({
      day: new Date(event.date).getDate(),
      name: event.name,
      month: new Date(event.date).getMonth(),
      year: new Date(event.date).getFullYear(),
    }));

    let emptyDays = Array(startDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      const event = eventDates.find(
        (event) =>
          event.day === i &&
          event.month === currentMonth &&
          event.year === currentYear
      );

      calendarDays.push(
        <div
          key={i}
          className={`md:size-12 size-10 flex items-center justify-center cursor-pointer relative group
            ${event ? "bg-orange-500 text-white" : "bg-gray-200"} 
            ${
              i === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? "border-2 border-blue-500"
                : ""
            } rounded-md`}
        >
          {i}
          {event && (
            <div className="w-50 z-50 text-center absolute bottom-12 bg-gray-500 text-white text-xs p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {event.name}
            </div>
          )}
        </div>
      );
    }

    return [...emptyDays, ...calendarDays];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading calendar...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => changeMonth("prev")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Previous Month
          </button>
          <button
            onClick={() => changeMonth("next")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Next Month
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-7 gap-4 rounded-lg border-2 border-gray-200 p-4 bg-white">
            <div className="text-center font-semibold">Sun</div>
            <div className="text-center font-semibold">Mon</div>
            <div className="text-center font-semibold">Tue</div>
            <div className="text-center font-semibold">Wed</div>
            <div className="text-center font-semibold">Thu</div>
            <div className="text-center font-semibold">Fri</div>
            <div className="text-center font-semibold">Sat</div>

            {renderCalendarDays()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventCalendar;
