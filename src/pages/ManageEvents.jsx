import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../components/provider/AuthProvider";
import Navbar from "../components/Navbar";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    thumbnailUrl: "",
    location: "",
    eventDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`https://assignment-eleven-chi.vercel.app/api/events?createdBy=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events.");
        setLoading(false);
      });
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const startEdit = (event) => {
    setEditingId(event._id);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      eventType: event.eventType || "",
      thumbnailUrl: event.thumbnailUrl || "",
      location: event.location || "",
      eventDate: event.eventDate
        ? typeof event.eventDate === "string"
          ? event.eventDate.slice(0, 10)
          : new Date(event.eventDate).toISOString().slice(0, 10)
        : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      eventType: "",
      thumbnailUrl: "",
      location: "",
      eventDate: "",
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.eventDate || !formData.eventType || !formData.thumbnailUrl) {
      toast.error("Please fill all required fields.");
      return;
    }

    setUpdating(true);

    try {
      const res = await fetch(`https://assignment-eleven-chi.vercel.app/api/events/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedEvent = await res.json();

      setEvents((prev) =>
        prev.map((evt) => (evt._id === editingId ? updatedEvent : evt))
      );
      cancelEdit();
      toast.success("Event updated successfully!");
    } catch {
      toast.error("Failed to update event.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = (eventId) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete?
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                deleteEvent(eventId);
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 border text-sm rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      {
        duration: 10000,
        style: { maxWidth: "320px" },
      }
    );
  };

  const deleteEvent = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`https://assignment-eleven-chi.vercel.app/api/events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((evt) => evt._id !== id));
      toast.success("Event deleted successfully!");
    } catch {
      toast.error("Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-500">
        Please log in to manage your events.
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="md:py-12 py-7 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-orange-600">
            Manage Your Events
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            View and update your previously created events below.
          </p>

          {loading && <p className="text-center text-gray-500">Loading events...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && events.length === 0 && (
            <p className="text-center text-gray-500">No events created yet.</p>
          )}

          <ul className="space-y-6">
            {events.map((event) => (
              <li
                key={event._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {editingId === event._id ? (
                  <form onSubmit={submitUpdate} className="space-y-5">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Event Type</label>
                      <input
                        type="text"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Thumbnail URL</label>
                      <input
                        type="text"
                        name="thumbnailUrl"
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Event Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={updating}
                        className={`bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm ${
                          updating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {updating ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        disabled={updating}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 mt-1">{event.description}</p>
                    <p className="text-gray-600 mt-1">
                      <strong>Type:</strong> {event.eventType || "N/A"}
                    </p>
                    <div className="text-gray-600 mt-1">
                       <img src={event.thumbnailUrl} alt={event.title} className="w-full h-48 object-cover" />
                    </div>
                    <p className="text-gray-600 mt-1">
                      <strong>Location:</strong> {event.location || "N/A"}
                    </p>
                    <p className="text-gray-600 mt-1">
                      <strong>Date:</strong>{" "}
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => startEdit(event)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deletingId === event._id}
                        className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm ${
                          deletingId === event._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {deletingId === event._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ManageEvents;