import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <Head>
       <link rel="icon" href="/favicon.ico" />
       <title>Horizon Relevance</title>
       <meta name="description" content="Cloud, AI, and DevSecOps Solutions by Horizon Relevance" />
       <meta property="og:title" content="Horizon Relevance" />
       <meta property="og:description" content="Empowering the Future with Cloud, AI & DevSecOps" />
       <meta property="og:image" content="/og-image.png" />
       <meta property="og:url" content="https://your-vercel-url.vercel.app" />
       <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex justify-between items-center py-4">
       <div className="flex items-center space-x-2">
        <img src="/HR_LOGO.png" alt="Horizon Relevance Logo" className="h-10 w-auto" />
        <h1 className="text-xl font-bold">HORIZON RELEVANCE</h1>
       </div>
       <nav className="space-x-4">
         {/* navigation links */}
       </nav>
      </header>
      <main className="mt-10">
        <h2 className="text-4xl font-extrabold mb-4">Empowering the Future with Cloud, AI & DevSecOps</h2>
        <p className="text-lg text-gray-700 max-w-xl">
          We build next-gen cloud solutions to optimize, automate, and scale your business.
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/services" className="bg-blue-600 text-white px-4 py-2 rounded">Explore Solutions</Link>
          <Link href="/contact" className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Contact Us</Link>
        </div>
      </main>
    </div>
  );
}
