import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Horizon Relevance Logo" className="h-10" />
        <span className="text-xl font-bold text-blue-800">Horizon Relevance</span>
      </div>
      <div className="space-x-4 text-blue-600 font-medium">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}