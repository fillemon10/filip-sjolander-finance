import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { financialAccounts } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const AccountSchema = z.object({
    id: z.number(),
    userId: z.string(),
    name: z.string(),
});

const AccountsResponseSchema = z.array(AccountSchema);

export const financialAccountRouter = createTRPCRouter({
    getAccounts: publicProcedure
        .query(async ({ ctx }) => {
            const userId = ctx.session?.user?.id;

            if (!userId) {
                throw new Error("Unauthorized");
            }

            const accounts = await ctx.db
                .select()
                .from(financialAccounts)
                .where(eq(financialAccounts.userId, userId));


            return AccountsResponseSchema.parse(accounts);
        })
});
