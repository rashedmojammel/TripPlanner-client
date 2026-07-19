import { createAuthClient } from "better-auth/react";

const API_URL = process.env.BETTER_AUTH_URL ?? "http://localhost:5000/api";

export const authClient = createAuthClient({
  baseURL: API_URL.replace(/\/api$/, "") + "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;