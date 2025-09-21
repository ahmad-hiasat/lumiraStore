"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchSearchProducts } from "@/features/search/searchThunks";
import { clearResults } from "@/features/search/searchSlice";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ⬅️ جديد

interface Product {
  price: number;
  title: string;
  _id: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector(
    (state: RootState) => state.search
  );
  const pathname = usePathname();
  useEffect(() => {
    if ( pathname === "/") {
      dispatch(clearResults());
      setQuery("");
    }
  }, [pathname, dispatch]);
  const handleSearch = () => {
    if (query.length >= 3) {
      dispatch(fetchSearchProducts(query));
    } else {
      dispatch(clearResults());
    }
  };
  return (
    <div className="w-full max-w-lg">
      <form >
        <input
          className="bg-white border rounded-full px-8 w-full h-[45px] md:h-[55px]"
          type="search"
          placeholder="Search our products"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 3) {
              handleSearch();
            } else {
              dispatch(clearResults());
            }
          }}
        />
      </form>

      {loading && <p>جارى البحث...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-2 space-y-2">
        {results.length > 0 &&
          results.map((product: Product) => (
            <Link
              href={`/SingleProduct/${product._id}`}
              key={product._id}
              className="border w-full h-[50px] cursor-pointer flex items-center justify-between p-3 rounded bg-white"
            >
              <h2 className="font-bold">{product.title}</h2>
              <p>{product.price} EGP</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
