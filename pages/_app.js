import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Horizon Relevance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
