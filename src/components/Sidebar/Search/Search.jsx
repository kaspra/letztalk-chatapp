import React, { useEffect, useState } from "react";

import "./Search.scss";

const Search = ({ chats, setChats, originalChats }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filteredUser = Object.values(originalChats).filter((user) =>
        user.userInfo.displayName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      setChats(filteredUser);
    } else {
      setChats(originalChats);
    }
  }, [searchValue, setChats, originalChats]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search_internal">
      <div className="search_internal-con">
        <form>
          <input
            className="search_internal-input"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            value={searchValue}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
