"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { api } from "@/lib/api";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, university?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("boibazaar_token");
    const storedUser = localStorage.getItem("boibazaar_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = (newToken: string, newUser: User) => {
    localStorage.setItem("boibazaar_token", newToken);
    localStorage.setItem("boibazaar_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const data = await api.login({ email, password });
    persistSession(data.token, data.user);
  };

  const register = async (name: string, email: string, password: string, university?: string) => {
    const data = await api.register({ name, email, password, university });
    persistSession(data.token, data.user);
  };

  // Both social methods follow the same flow: Firebase handles the actual
  // Google/Facebook sign-in popup and identity verification, then we hand
  // its ID token to our own backend, which verifies it server-side and
  // returns a normal BoiBazaar session (JWT + user) — so every other part
  // of the app keeps working with a single, consistent auth model.
  const loginWithGoogle = async () => {
    const idToken = await signInWithGoogle();
    const data = await api.socialLogin(idToken);
    persistSession(data.token, data.user);
  };

  const loginWithFacebook = async () => {
    const idToken = await signInWithFacebook();
    const data = await api.socialLogin(idToken);
    persistSession(data.token, data.user);
  };

  const logout = () => {
    localStorage.removeItem("boibazaar_token");
    localStorage.removeItem("boibazaar_user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, loginWithGoogle, loginWithFacebook, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
