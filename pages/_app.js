import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* head tagi dla wszsytkich stron, żeby nie kopiować w komponentach */}
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      {/* można tak opakowac, bo layout też przyjmuje props.children */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
