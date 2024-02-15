import SearchBar from "@/components/atoms/Inputs/SearchBar";
import Nav from "@/components/molecules/NavigationBar";
import SearchList from "@/components/organisms/SearchList";
import React from "react";

export default function Search() {
  return (
    <div>
      <Nav />
      <SearchBar size="small" />
      <SearchList />
    </div>
  );
}
