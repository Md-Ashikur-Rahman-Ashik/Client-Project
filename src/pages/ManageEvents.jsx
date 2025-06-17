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
    location: "",
    eventDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/events?createdBy=${user.id}`)
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
      title: event.title,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate.slice(0, 10),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      eventDate: "",
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.eventDate) {
      toast.error("Please fill required fields.");
      return;
    }

    try {
      const res = await fetch(`/api/events/${editingId}`, {
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
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((evt) => evt._id !== id));
      toast.success("Event deleted successfully!");
    } catch {
      toast.error("Failed to delete event.");
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
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
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
                        onClick={() => deleteEvent(event._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Delete
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