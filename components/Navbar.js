import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isPlatformOpen, setPlatformOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);

  return (
    <header className="bg-black text-white">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Horizon Relevance Logo" className="h-10" />
          <span className="text-xl font-bold text-white">Horizon Relevance</span>
        </div>

        <div className="flex space-x-6">
          <Link href="/">Home</Link>

          <div className="relative">
            <button onClick={() => setPlatformOpen(!isPlatformOpen)} className="hover:text-blue-400">
              Platform &#x25BC;
            </button>
            {isPlatformOpen && (
              <div className="absolute bg-white text-black shadow-md mt-2 py-2 rounded w-64 z-50">
                <Link href="/products/cloud-cost-optimization" className="block px-4 py-2 hover:bg-gray-100">Cloud Cost Optimization</Link>
                <Link href="/products/multi-cloud-manager" className="block px-4 py-2 hover:bg-gray-100">Multi-Cloud Manager</Link>
                <Link href="/products/serverless-framework" className="block px-4 py-2 hover:bg-gray-100">Serverless Framework</Link>
                <Link href="/products/ai-monitoring" className="block px-4 py-2 hover:bg-gray-100">AI Monitoring & RCA</Link>
                <Link href="/products/self-service-cicd" className="block px-4 py-2 hover:bg-gray-100">Self-Service CI/CD</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setCompanyOpen(!isCompanyOpen)} className="hover:text-blue-400">
              Company &#x25BC;
            </button>
            {isCompanyOpen && (
              <div className="absolute bg-white text-black shadow-md mt-2 py-2 rounded w-48 z-50">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">About Us</Link>
                <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</Link>
                <Link href="/careers" className="block px-4 py-2 hover:bg-gray-100">Careers</Link>
                <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact Us</Link>
              </div>
            )}
          </div>

          <Link href="/products">Products</Link>
        </div>

        <div className="space-x-3">
          <Link href="/signin" className="text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition">Sign In</Link>
          <button
            onClick={() =>
              window.Calendly?.initPopupWidget({
                url: 'https://calendly.com/kashyap-ankur0114/30min',
              })
            }
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Book a Demo
          </button>
        </div>
      </nav>
    </header>
  );
}