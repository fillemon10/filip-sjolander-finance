import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import { db } from "~/server/db"
import type { Provider } from "next-auth/providers"
import Github from "next-auth/providers/github";

const providers: Provider[] = [
  Github
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const { handlers, auth, signOut, signIn } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Github],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
  pages: {
    signIn: "/signin",
  },
})
