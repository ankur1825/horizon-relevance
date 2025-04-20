import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center py-20 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Empowering the Future with Cloud, AI & DevSecOps</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        We build next-gen cloud solutions to optimize, automate, and scale your business.
      </p>
      <div className="mt-6">
        <Link href="/services" className="bg-blue-600 text-white px-6 py-2 rounded mr-4">Explore Solutions</Link>
        <Link href="/contact" className="border border-blue-600 text-blue-600 px-6 py-2 rounded">Contact Us</Link>
      </div>
    </section>
  );
}