import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>ICC app</h1>
      <p>
        Innovation Cybercafe is a platform that provides innovative solutions to all online and Offline related educational problems to students
        across Nigeria
      </p>
    </main>
  );
}
