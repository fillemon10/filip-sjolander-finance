import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { monthlyBudgets, users, financialAccounts } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

const MonthlyBudgetResponseSchema = z.object({
    id: z.number(),
    userId: z.string(),
    financialAccountId: z.number(),
    month: z.number(),
    amount: z.number(),
});


export const monthlyBudgetRouter = createTRPCRouter({
    getMonthlyBudget: publicProcedure
        .input(z.object({
            month: z.number(),
            financialAccountName: z.string(),
        }))
        .query(async ({ input, ctx }) => {
            const financialAccountName = input.financialAccountName;
            const month = input.month;

            if (ctx.session?.user?.id === undefined) {
                throw new Error("Unauthorized");
            }

            const budget = await ctx.db
                .select()
                .from(users)
                .leftJoin(financialAccounts, eq(users.id, financialAccounts.userId))
                .leftJoin(monthlyBudgets, eq(financialAccounts.id, monthlyBudgets.financialAccountId))
                .where(and(
                    eq(users.id, ctx.session?.user?.id),
                    eq(financialAccounts.name, financialAccountName),
                    eq(monthlyBudgets.month, month))).limit(1);

            return MonthlyBudgetResponseSchema.parse(budget);
        }),
});
