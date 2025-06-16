import React from "react";

const testimonials = [
  {
    name: "Fatima Rahman",
    comment:
      "Evenzy made organizing my first public workshop so easy. The platform is smooth and reliable!",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Arif Chowdhury",
    comment:
      "I found events I never knew were happening around me. It’s my go-to site every weekend.",
    photo: "https://randomuser.me/api/portraits/men/72.jpg",
  },
  {
    name: "Rina Akter",
    comment:
      "Simple, clean, and effective. Loved how quick it was to register for events through Evenzy.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-14">
      <div className="ccc text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          What Users Say
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl transition duration-300 flex flex-col items-center"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-16 h-16 rounded-full border-2 border-orange-500 mb-4"
              />
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {t.comment}
              </p>
              <p className="mt-auto text-sm font-semibold text-orange-600">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
