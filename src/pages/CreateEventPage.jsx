import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const CreateEvent = ({ user }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(null);

  const onSubmit = (data) => {
    if (!startDate || startDate <= new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    const eventData = {
      ...data,
      date: startDate.toISOString(),
      userEmail: user?.email || "unknown",
    };

    // Simulating an API call
    console.log("Event Data:", eventData);
    toast.success("Event created successfully!");
    navigate("/upcoming-events");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Event Type</label>
          <select
            {...register("eventType", { required: "Event type is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select event type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
          </select>
          {errors.eventType && (
            <p className="text-red-500 text-sm">{errors.eventType.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image URL</label>
          <input
            type="url"
            {...register("thumbnail", { required: "Image URL is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Event Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full border p-2 rounded"
            minDate={new Date()}
            placeholderText="Select a date"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
