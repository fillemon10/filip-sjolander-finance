import { api } from "~/trpc/react";

export default async function AccountInfo({ currentAccount }: { currentAccount: string }) {
    const [budget] = api.monthlyBudget.getMonthlyBudget.useSuspenseQuery({
        financialAccountName: currentAccount,
        month: 8,
    });
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {budget && (
                <div className="col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Account Info
                            {budget.amount}
                            {budget.month}
                            {budget.financialAccountId}
                            {budget.userId}
                            {budget.id}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
}
