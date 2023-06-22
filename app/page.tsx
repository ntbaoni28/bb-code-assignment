"use client";

import styles from "@/styles/index.module.css";
import { TProduct } from "@/types";
import { Error, Loading, NoData, Product } from "@/components";
import useProducts from "@/hook/useProducts";
import { useCallback, useEffect, useRef, useState } from "react";
import _debounce from "lodash.debounce";
import useOnScreen from "@/hook/useOnScreen";

export default function Home() {
  const [key, setKey] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, products, setProducts, allShown } = useProducts(
    key,
    page
  );

  const refLastProduct = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(refLastProduct, loading);

  useEffect(() => {
    if (isVisible && !allShown) {
      setPage((prev) => prev + 1);
    }
  }, [isVisible]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts([]);
    setKey(e.target.value);
    setPage(1);
  };

  const searchDebounceFn = useCallback(_debounce(handleSearch, 1000), []);

  return (
    <main className={styles.main}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search..."
          onChange={searchDebounceFn}
        />
      </div>
      <div className={styles.grid}>
        {products?.map((product: TProduct, index) => (
          <Product data={product} key={index} />
        ))}
      </div>
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <NoData />
      ) : (
        <div ref={refLastProduct} className="bottom"></div>
      )}
      {error && (
        <Error message="Error! An error occurred. Please try again later" />
      )}
    </main>
  );
}
