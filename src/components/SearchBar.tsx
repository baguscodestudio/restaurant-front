import React from "react";
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt";

const SearchBar: React.FC<{
  setSearch: (search: string) => void;
  placeholder?: string;
}> = ({ setSearch, placeholder }) => {
  return (
    <div className="inline-flex w-full items-center focus-within:ring-2">
      <input
        className="px-4 py-2 w-full text-right text-lg outline-none bg-transparent"
        placeholder={placeholder ? placeholder : "Search..."}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <SearchAlt size="48" />
    </div>
  );
};

export default SearchBar;
