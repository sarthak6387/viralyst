"use client";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  initializeUserAnalytics,
} from "@/services/analytics.service";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { auth } from "@/firebase/client";

import { createUserIfNotExists }
  from "@/services/user.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
  });

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {

            await initializeUserAnalytics(
    user.uid
  );
             
            await createUserIfNotExists(
              user
            );

            setUser(user);
          } else {
            setUser(null);
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};