import Head from "next/head";
import styles from "../../styles/Home.module.css";

interface PageProps {
  main: React.ReactNode;
  title: React.ReactNode;
}

const Page = ({ main, title }: PageProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Mono server for projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{main}</main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by TBD
        </a>
      </footer>
    </div>
  );
};

export default Page;
