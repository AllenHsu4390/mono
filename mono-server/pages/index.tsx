import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Page from "./ui/page";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Page
      title={<>Mono server</>}
      main={
        <>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div className={styles.grid}>
            <a href="/genshin" className={styles.card}>
              <h2>Project A &rarr;</h2>
              <p>genshin calculator</p>
            </a>
          </div>
        </>
      }
    />
  );
};

export default Home;
