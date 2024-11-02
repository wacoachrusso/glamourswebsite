import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-glamour-dark mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Book an appointment</li>
              <li>Create an account</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Process your appointments</li>
              <li>Send appointment reminders</li>
              <li>Communicate with you about our services</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. Your privacy is important to us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-glamour-dark mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our Privacy Policy, please contact us at:
              <br />
              Email: info@glamoursbeauty.com
              <br />
              Phone: (973) 344-5199
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;