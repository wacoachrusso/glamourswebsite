import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-glamour-dark mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Appointment Policy</h2>
            <p className="text-gray-600 mb-4">
              Please arrive 5-10 minutes before your scheduled appointment time. Late arrivals may result in reduced service time or rescheduling.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Cancellation Policy</h2>
            <p className="text-gray-600 mb-4">
              We require 24-hour notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Payment Terms</h2>
            <p className="text-gray-600 mb-4">
              We accept cash, credit cards, and digital payments. Payment is required at the time of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Service Guarantee</h2>
            <p className="text-gray-600 mb-4">
              Your satisfaction is our priority. Please let us know within 7 days if you're not completely satisfied with your service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;