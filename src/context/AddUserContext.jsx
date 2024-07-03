import React, { useState, useContext } from "react";

export const AppContext = React.createContext();

export const AddUserContext = ({ children }) => {
  const [addUser, setAddUser] = useState(false);

  const openAddUser = () => {
    setAddUser(true);
  };

  const closeAddUser = () => {
    setAddUser(false);
  };

  return (
    <AppContext.Provider value={{ openAddUser, closeAddUser, addUser }}>
      {children}
    </AppContext.Provider>
  );
};
