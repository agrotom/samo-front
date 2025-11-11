import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUser, isLoggedIn, login, type UserInfo } from "@/api/auth";
import usePersistedState from "@/hooks/usePersistedState";

interface AuthContextType {
  token: string;
  user: UserInfo | null,
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => Promise<boolean>;
}

const defaultAuthContext: AuthContextType = {
  token: "",
  user: null,
  login: async () => { return; },
  logout: async () => { return; },
  isLoggedIn: async () => false
}

interface AuthProviderProperties {
  children: React.ReactNode | React.ReactNode[];
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: AuthProviderProperties) => {
  const [token, setToken] = usePersistedState<string>("token", "");
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      login: async (email: string, password: string) => {
        var data = await login(email, password);
        setToken(data.token);
        setUser({ email: data.email, sureName: data.sureName, firstName: data.firstName, achieve: data.achieve, birthDate: data.birthDate });
      },
      logout: () => {
        setToken("");
        setUser(null);
      },
      isLoggedIn
    }),
    [token, user]
  );
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};