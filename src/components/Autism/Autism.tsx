import type { FC, PropsWithChildren } from "react";
import styles from "./Autism.module.css";

export const Autism: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.card}>
      <div className={styles.scanlines} />
      <div className={styles.noise} />

      <div className={styles.content}>{children}</div>
    </main>
  );
};
