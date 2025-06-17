import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../components/provider/AuthProvider";

const JoinedEventPage = () => {
    const { user } = useContext(AuthContext);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchJoinedEvents = async () => {
            try {
                const res = await fetch(
                    `https://assignment-eleven-chi.vercel.app/api/joined-events?email=${user.email}`
                );
                const data = await res.json();

                const sortedEvents = data.sort(
                    (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
                );
                setJoinedEvents(sortedEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [user?.email]);

    if (loading) {
        return <div className="text-center py-10 text-lg font-semibold">Loading your events...</div>;
    }

    if (!joinedEvents.length) {
        return <div className="text-center py-10 text-lg text-gray-500">You haven't joined any events yet.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Joined Events</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {joinedEvents.map((event) => (
                        <div key={event._id} className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg">
                            <img src={event.thumbnailUrl} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4 space-y-2">
                                <h2 className="text-xl font-semibold">{event.title}</h2>
                                <p className="text-gray-600">{event.description}</p>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaCalendarAlt />
                                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaClock />
                                    <span>{new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FaMapMarkerAlt />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoinedEventPage;
