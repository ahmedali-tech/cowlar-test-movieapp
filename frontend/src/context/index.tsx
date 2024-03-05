import React, { createContext, useEffect, useState } from 'react';
import { IUser, IContext } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const UserContext = createContext<IContext>(null!);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const updateUser = (userData: IUser) => {
    setUser(() => userData);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const contextValue = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
