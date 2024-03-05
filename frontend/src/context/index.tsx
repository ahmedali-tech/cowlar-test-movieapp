import React, { createContext, useEffect, useState } from 'react';
import { IUser, IContext } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const UserContext = createContext<IContext>(null!);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const updateUser = (userData: IUser | null) => {
    setUser(() => userData);
  };

  useEffect(() => {
    console.log(user);
    console.log("from context -> isLoggedIn: ", isLoggedIn);
    console.log(localStorage.getItem("COWLAR_TOKEN"));
  }, [user, isLoggedIn]);

  const contextValue = {
    user,
    updateUser,
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
