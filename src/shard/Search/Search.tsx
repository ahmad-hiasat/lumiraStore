"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchSearchProducts } from "@/features/search/searchThunks";
import { clearResults } from "@/features/search/searchSlice";
interface product  {
  price:number
  title:string
  _id:string

}
const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector((state: RootState) => state.search);

  const handleSearch = () => {
    if (query.length >= 3) {
      dispatch(fetchSearchProducts(query));
    } else {
      dispatch(clearResults());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="bg-white border rounded-full px-8 w-full h-[55px]"
          type="search"
          placeholder="Search our products"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 3) {
              handleSearch(); // بحث مباشر أثناء الكتابة
            } else {
              dispatch(clearResults());
            }
          }}
        />
      </form>

      {loading && <p>جارى البحث...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 space-y-2">
        {results.length > 0 &&
          results.map((product:product) => (
            <div key={product._id} className="border p-3 rounded bg-white">
              <h2 className="font-bold">{product.title}</h2>
              <p>{product.price} EGP</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
