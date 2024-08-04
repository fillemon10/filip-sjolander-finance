
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function AccountSelector({ placeholder }: { placeholder: string }) {
    const [accounts] = api.financialAccount.getAccounts.useSuspenseQuery();
    const [selectedAccount, setSelectedAccount] = useState(placeholder);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleAccountChange(account: string) {
        setSelectedAccount(account);
        const params = new URLSearchParams(searchParams);
        if (account) {
            params.set("account", account);
        } else {
            params.delete("account");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <Select value={selectedAccount} onValueChange={handleAccountChange} >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={searchParams.get("account") || placeholder}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {accounts?.map((account) => (
                        <SelectItem key={account.id} value={account.name}>
                            {account.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
}
