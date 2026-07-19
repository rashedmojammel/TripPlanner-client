import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";

const RAW =
  process.env.BETTER_AUTH_URL ?? "http://localhost:5000/api";

const CLEAN = RAW.trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
const SERVER = CLEAN.replace(/\/api$/, "");

export const authClient = createAuthClient({
  baseURL: `${SERVER}/api/auth`,
  fetchOptions: { credentials: "include" },
  plugins: [
    inferAdditionalFields({ user: { userRole: { type: "string" } } }),
    adminClient(),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;