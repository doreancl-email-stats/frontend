import Head from 'next/head';
import Script from 'next/script';

const Chartist = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
        />
      </Head>
      <Script
        id="chartist-js"
        src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
        onLoad={() => {
          console.log('loaded chartist');
        }}
      />
    </>
  );
};
export default Chartist;
