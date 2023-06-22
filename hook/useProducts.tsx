"use client";

import { TProduct } from "@/types";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";

const LIMIT = 9;
export default function useProducts(key: string, page: number = 1) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allShown, setAllShown] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;
    axios({
      method: "GET",
      url: `https://dummyjson.com/products/search`,
      params: { q: key, page: page, skip: (page - 1) * LIMIT, limit: LIMIT },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setProducts((prev) => [...prev, ...data?.products]);
        setAllShown(data?.total <= LIMIT * page);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      });
    return () => cancel();
  }, [key, page]);

  return { loading, error, products, setProducts, allShown };
}
