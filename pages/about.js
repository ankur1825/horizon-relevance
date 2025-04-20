import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Horizon Relevance</title>
        <meta name="description" content="About Horizon Relevance" />
      </Head>
      {/* <Navbar /> */}
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-6">About Horizon Relevance</h1>
        <p className="text-lg">
          At Horizon Relevance, we are committed to transforming businesses through intelligent cloud-native technologies. Founded by passionate cloud and DevOps engineers, we believe in building platforms that solve real problems—efficiently, securely, and at scale.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Our Vision</h2>
        <p>To become a trusted innovation partner for companies adopting cloud, AI, and DevSecOps strategies worldwide.</p>

        <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
        <p>To deliver cloud platforms that drive measurable cost savings, reduce deployment friction, and enable autonomous systems powered by AI.</p>

        <h2 className="text-2xl font-semibold mt-6">Our Philosophy</h2>
        <p>We put people first—whether it's simplifying engineering workflows, driving cost visibility, or delivering business impact. Our team thrives at the intersection of innovation and execution.</p>
      </main>
      {/* <Footer /> */}
    </>
  );
}
