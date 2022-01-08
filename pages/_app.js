import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* head tagi dla wszsytkich stron, żeby nie kopiować w komponentach */}
      {/* nextjs merguje Head z komponentow gdy nie ma konfliktów, przy konfliktach np title to bierze ostatni */}
      <Head>
        {/* ponizej tytuł, jak zapomne dodac title w komponencie to bedzie ten, a jak nie to nadpisany z komponentu */}
        <title>Next Events</title>
        <meta name="description" content=""/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      {/* można tak opakowac, bo layout też przyjmuje props.children */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
