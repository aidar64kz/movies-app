import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuery, setPage } from "../state/reducers/moviesSlice";
import useDebounce from "../hooks/useDebounce";
import "../styles/SearchBar.scss";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(setQuery(debouncedSearchTerm));
    dispatch(setPage(1));
  }, [debouncedSearchTerm, dispatch]);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="search-bar">
      <img
        className="logo"
        src="/logo.png"
        alt="Logo"
        onClick={handleLogoClick}
      />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </header>
  );
};

export default SearchBar;
