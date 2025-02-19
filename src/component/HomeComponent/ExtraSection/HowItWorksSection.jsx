

const HowItWorksSection = () => {
    return (
        <section className="py-16 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Step 1: Sign Up</h3>
              <p className="mt-4">Create an account and set up your organization.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Step 2: Add Employees</h3>
              <p className="mt-4">Quickly input employee information.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Step 3: Track & Manage</h3>
              <p className="mt-4">Use dashboards to track employee data, performance, and more.</p>
            </div>
          </div>
        </div>
      </section>


    );
};

export default HowItWorksSection;