import { IonInput } from "@ionic/react";
import React from "react";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
}) => {
  return (
    <div className="search-bar">
      <IonInput
        className="input"
        placeholder="Search by title..."
        value={searchInput}
        onIonInput={(e) => setSearchInput(e.detail.value!)}
        required
      />
    </div>
  );
};

export default SearchBar;
