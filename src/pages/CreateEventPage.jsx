import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { AuthContext } from "../components/provider/AuthProvider"; // 👈 Import AuthContext

const CreateEvent = () => {
  const { user } = useContext(AuthContext); // 👈 Get user from context
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);

  const onSubmit = async (data) => {
    if (!startDate || startDate <= new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    if (!user?.email) {
      toast.error("User not logged in. Please login first.");
      return;
    }

    const eventData = {
      title: data.title,
      description: data.description,
      eventType: data.eventType,
      thumbnailUrl: data.thumbnail,
      location: data.location,
      eventDate: startDate.toISOString(),
      createdBy: user.email, // ✅ Use from context
    };

    try {
      const res = await fetch("https://assignment-eleven-chi.vercel.app/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Event created successfully!");
        navigate("/events");
      } else {
        toast.error(result.message || "Failed to create event.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="md:py-12 py-7 bg-gray-50 min-h-screen">
        <div className="ccc">
          <h2 className="text-4xl font-bold text-center mb-3 text-orange-600">
            Create Event
          </h2>
          <p className="text-gray-600 text-center md:mb-10 mb-6 max-w-2xl mx-auto">
            Fill out the form below to organize a new event. Make sure to enter all required details.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto p-6 space-y-5"
          >
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full border-gray-300 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full border-gray-300 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Event Type */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Event Type</label>
              <select
                {...register("eventType", { required: "Event type is required" })}
                className="w-full border-gray-300 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select event type</option>
                <option value="Cleanup">Artificial Intelligence</option>
                <option value="Plantation">Cybersecurity</option>
                <option value="Donation">Blockchain</option>
                <option value="Donation">Startups</option>
                <option value="Donation">Green Technology</option>
              </select>
              {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType.message}</p>}
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Thumbnail Image URL</label>
              <input
                type="url"
                {...register("thumbnail", { required: "Image URL is required" })}
                className="w-full border-gray-300 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Location</label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full border-gray-300 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Event Date */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Event Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full border-gray-300 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                minDate={new Date()}
                placeholderText="Select a date"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Create Event
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateEvent;