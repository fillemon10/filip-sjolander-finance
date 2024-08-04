import { Suspense } from "react";
import AccountInfo from "~/app/_components/dashboard/account-info";
import AccountSelector from "~/app/_components/dashboard/account-selector";
import { api, HydrateClient } from "~/trpc/server";

export default async function Overview({
    params
}: {
    params?: {
        account?: string;
    };

}) {
    const currentAccount = params?.account || '';

    console.log(currentAccount);

    void api.financialAccount.getAccounts.prefetch();
    void api.monthlyBudget.getMonthlyBudget.prefetch({
        financialAccountName: currentAccount,
        month: 8,
    });


    return (
        <HydrateClient>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <AccountSelector placeholder="Select Account" />
                    <Suspense fallback={<div>Loading...</div>}>
                        <AccountInfo currentAccount={currentAccount} />
                    </Suspense>
                </div>
            </div>
        </HydrateClient>

    );
}
