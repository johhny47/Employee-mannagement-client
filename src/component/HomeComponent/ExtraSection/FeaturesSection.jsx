function FeaturesSection() {
    return (
        <>
      <section className="py-16 bg-gray-50 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Features that Empower Your Team</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Employee Scheduling</h3>
              <p className="mt-4">Easily manage shifts and track attendance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Task Management</h3>
              <p className="mt-4">Assign and monitor employee tasks seamlessly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Performance Tracking</h3>
              <p className="mt-4">Evaluate employee progress and productivity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Payroll Integration</h3>
              <p className="mt-4">Automate payroll processing for accuracy.</p>
            </div>
          </div>
        </div>
      </section>
   
        
       
      </>
    );
  }
  
  export default FeaturesSection;
  