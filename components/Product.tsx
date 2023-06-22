"use client";

import { TProduct } from "@/types";
import styles from "@/styles/index.module.css";
import Image from "next/image";

type TProductProps = {
  data: TProduct;
};

export default function Product({ data }: TProductProps) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={data?.thumbnail} alt="image" fill={true} loading={"lazy"} />
      </div>
      <h2>{data?.title}</h2>
      <h3>{data?.price}</h3>
      <p>{data?.description}</p>
    </div>
  );
}
