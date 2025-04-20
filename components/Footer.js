import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Description */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Horizon Relevance</h2>
          <p className="text-gray-300 text-sm">
            Horizon Relevance empowers digital transformation through intelligent cloud solutions. Our platform simplifies complex cloud operations, enabling teams to scale faster, smarter, and more securely.
          </p>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="mailto:info@horizonrelevance.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-2">Useful Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-2">Contact Us</h2>
          <p className="text-sm text-gray-300">📍 Woodbridge, NJ</p>
          <p className="text-sm text-gray-300">✉️ info@horizonrelevance.com</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Horizon Relevance LLC. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
