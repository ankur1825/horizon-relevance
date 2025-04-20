import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Horizon Relevance</title>
        <meta name="description" content="Empowering the Future with Cloud, AI & DevSecOps" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </>
  );
}