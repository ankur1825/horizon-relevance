// import Head from 'next/head';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// export default function Services() {
//   return (
//     <>
//       <Head>
//         <title>Our Services - Horizon Relevance</title>
//         <meta name="description" content="Services offered by Horizon Relevance" />
//       </Head>
//       <Navbar />
//       <main className="p-8">
//         <h1 className="text-4xl font-bold mb-8">Our Services</h1>
//         <ul className="space-y-4">
//           <li>☁️ <strong>Cloud Strategy & Migration:</strong> Design and execute seamless cloud journeys.</li>
//           <li>🛡 <strong>DevSecOps as a Service:</strong> Automate secure CI/CD pipelines.</li>
//           <li>🧠 <strong>AI & Data Science Consulting:</strong> Enable data-driven decisions at scale.</li>
//           <li>🤖 <strong>Generative AI Enablement:</strong> Leverage AI copilots and automation.</li>
//           <li>🧩 <strong>Serverless Application Framework:</strong> Build scalable, serverless solutions.</li>
//           <li>📏 <strong>Cloud Governance & Compliance:</strong> Control cloud spend and enforce compliance.</li>
//         </ul>
//       </main>
//       <Footer />
//     </>
//   );
// }
export default function Services() {
    const services = [
      {
        title: "Cloud Strategy & Migration",
        description: "Cloud readiness, migration roadmaps, and multi-cloud architecture."
      },
      {
        title: "DevSecOps as a Service",
        description: "Automated CI/CD pipelines with integrated security tools."
      },
      {
        title: "AI & Data Science Consulting",
        description: "Data pipeline design and predictive analytics using LLMs."
      },
      {
        title: "Generative AI Enablement",
        description: "RAG and LLM-based solutions for automation and insights."
      },
      {
        title: "Serverless Application Framework",
        description: "Build and deploy event-driven apps with AWS Lambda, Step Functions."
      },
      {
        title: "Cloud Governance & Cost Compliance",
        description: "Budgets, policies, and cost control across cloud environments."
      }
    ];
    return (
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="border p-4 rounded shadow-sm bg-white">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
