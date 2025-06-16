import React from "react";

const FaqAccordion = () => {
  return (
    <section className="bg-white py-12">
      <div className="ccc">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="collapse collapse-arrow bg-gray-100 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              How do I join an event?
            </div>
            <div className="collapse-content text-gray-600">
              Simply click on any event you're interested in and register with
              your details. It's quick and free!
            </div>
          </div>

          <div className="collapse collapse-arrow bg-gray-100 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Can I host my own event?
            </div>
            <div className="collapse-content text-gray-600">
              Yes! Anyone can create an event on Evenzy. Just sign in and click
              the "Host Event" button.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-gray-100 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Is Evenzy free to use?
            </div>
            <div className="collapse-content text-gray-600">
              Yes, Evenzy is completely free for both event seekers and hosts.
              Premium features may come later.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
