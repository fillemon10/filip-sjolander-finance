"use client"

import { Button } from "../button"

export default function SignOutButton({ signOut }: { signOut: () => void }) {
    return <Button onClick={() => {
        signOut()
    }
    }> Sign out</Button >
}
