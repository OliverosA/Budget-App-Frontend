import React from "react";
export const UserDataContext = React.createContext();

export const useUserDataContext = () => {
  const context = React.useContext(UserDataContext);
  if (!context) {
    throw new Error(
      "useUserDataContext cannot be used outside UserDataContext Provider"
    );
  }

  return context;
};

export const UserDataContextController = ({ children }) => {
  const isLoggedIn = true;
  return (
    <>
      <UserDataContext.Provider value={{ isLoggedIn }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};
