import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    trustedOrigins: [process.env.CLIENT_URL!],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // enable once SMTP is wired up
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    database: mongodbAdapter(db, { client }),
    user: {
        additionalFields: {
            // "userRole", not "role" — the admin plugin reserves "role" for its own access control
            userRole: {
                type: "string",
                defaultValue: "traveler",
                input: true,
            },
        },
    },
    plugins: [admin()],
});