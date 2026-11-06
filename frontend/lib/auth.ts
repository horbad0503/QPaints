"use client";

import useSWR from "swr";
import { api } from "./api";

export type Session = {
  authenticated: boolean;
  user?: { 
    id: number; 
    username: string; 
    fullName: string; 
    email: string; 
    profile_picture?: string; 
  };
  cartCount?: number;
  wishlistCount?: number;
};

const fetcher = () => api<Session>("auth/session");

export function useSession() {
  const { data, isLoading, mutate } = useSWR<Session>("/auth/session", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    session: data,
    isLoading,
    refresh: mutate,
    logout: async () => {
      await api("auth/logout", { method: "POST" });
      mutate();
    },
  };
}