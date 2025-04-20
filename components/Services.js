export default function Services() {
  const services = [
    {
      title: "Cloud Cost Optimization",
      description: "Reduce cloud expenses and maximize efficiency."
    },
    {
      title: "DevSecOps as a Service",
      description: "Integrate security into your DevOps pipelines."
    },
    {
      title: "AI-Driven Monitoring & Incident Response",
      description: "Proactively detect and resolve issues with AI insights."
    },
    {
      title: "Serverless Application Framework",
      description: "Build and deploy scalable serverless applications."
    }
  ];

  return (
    <section className="py-16 bg-white px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Our Key Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="border p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700">{service.title}</h3>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}