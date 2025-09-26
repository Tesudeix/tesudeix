import Link from "next/link";

import styles from "./page.module.css";

const apiBase = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <span className={styles.badge}>Next.js + MongoDB</span>
        <h1 className={styles.heading}>Ready to build full-stack features.</h1>
        <p className={styles.intro}>
          This starter wires up a typed MongoDB client, sample API routes, and a
          clean baseline UI so you can focus on your product instead of setup.
        </p>
      </section>

      <section className={styles.card}>
        <h2>Getting started</h2>
        <ol className={styles.list}>
          <li>
            Duplicate <span className={styles.code}>.env.example</span>
            {" "}to{" "}
            <span className={styles.code}>.env.local</span> and set your
            MongoDB connection details.
          </li>
          <li>
            Run <span className={styles.code}>npm run dev</span> and open{" "}
            <Link className={styles.link} href="/api/todos">
              /api/todos
            </Link>{" "}
            to confirm connectivity.
          </li>
          <li>
            Start building pages in <span className={styles.code}>src/app</span>
            {" "}and server logic in{" "}
            <span className={styles.code}>src/app/api</span>.
          </li>
        </ol>
      </section>

      <section className={styles.card}>
        <h2>API examples</h2>
        <div className={styles.apiExamples}>
          <code className={styles.code}>
            GET {apiBase}/api/todos
          </code>
          <code className={styles.code}>
            POST {apiBase}/api/todos
          </code>
        </div>
        <p className={styles.footer}>
          Send JSON bodies like{" "}
          <span className={styles.code}>{'{"title":"Learn Next.js"}'}</span>
          {" "}to create new documents.
        </p>
      </section>
    </main>
  );
}
