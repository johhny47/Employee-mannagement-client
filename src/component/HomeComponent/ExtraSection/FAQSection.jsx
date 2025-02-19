

const FAQSection = () => {
    return (
        <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-semibold">How secure is my employee data?</h3>
              <p className="mt-2 text-gray-700">We use industry-standard encryption and security protocols to keep your data safe.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-semibold">Can I integrate this with my existing HR tools?</h3>
              <p className="mt-2 text-gray-700">Yes, our platform supports integration with a variety of popular HR tools.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-semibold">How do I cancel my account?</h3>
              <p className="mt-2 text-gray-700">You can easily cancel your account anytime from the settings page in your account.</p>
            </div>
          </div>
        </div>
      </section>
      
    );
};

export default FAQSection;