import React, { useEffect, useState } from "react";

import "./Search.scss";

const Search = ({ chats, setChats, originalChats }) => {
  const [err, setErr] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filteredUser = Object.values(originalChats).filter((user) =>
        user.userInfo.displayName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      if (filteredUser.length === 0) {
        setErr(true);
      }

      setChats(filteredUser);
    } else {
      setChats(originalChats);
    }
  }, [searchValue, setChats, originalChats]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search">
      <div className="search_con">
        <form>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            value={searchValue}
          />
        </form>
        {err && <span className="err">User Not Found!</span>}
      </div>
    </div>
  );
};

export default Search;
