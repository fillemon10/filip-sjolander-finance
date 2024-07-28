import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();

    if (!session?.user) {
        redirect("api/auth/signin?callbackUrl=/profile");
    }
    console.log(session.user)

    return (
        <pre>{JSON.stringify(session, null, 2)}</pre>
    )
}
