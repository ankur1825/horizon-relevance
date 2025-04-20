export default function ProductCard({ title, tagline, features, useCases, idealFor, cta }) {
    const handleClick = () => {
      if (cta?.calendlyUrl) {
        window.Calendly.initPopupWidget({ url: cta.calendlyUrl });
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 italic mb-4">{tagline}</p>
  
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Features</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
  
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Use Cases</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {useCases.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
  
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Ideal For</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {idealFor.map((i, j) => <li key={j}>{i}</li>)}
          </ul>
        </div>
  
        {cta?.calendlyUrl && (
          <div className="mt-6">
           <button
             onClick={() => window.Calendly?.initPopupWidget({ url: cta.calendlyUrl })}
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
           >
             {cta.label}
           </button>
          </div>
        )}
      </div>
    );
  }
  