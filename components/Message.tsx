"use client";

import styles from "@/styles/index.module.css";

type TErrorProps = {
  message: string;
};

export function Error({ message }: TErrorProps) {
  return <div className={styles.error}>{message}</div>;
}

export function Loading() {
  return <div className={styles.loading}>Loading...</div>;
}

export function NoData() {
  return <div className={styles.loading}>No data</div>;
}
