import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* można tak opakowac, bo layout też przyjmuje props.children */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
