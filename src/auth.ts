import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, sessions, users, verificationTokens } from "@/db/schema"
import { db } from "@/db"

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
    },
})
