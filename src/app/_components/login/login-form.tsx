import Link from "next/link"
import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "~/server/auth"
import { AuthError } from "next-auth"
import { Button } from "~/app/_components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/app/_components/ui/card"
import { Input } from "~/app/_components/ui/input"
import { Label } from "~/app/_components/ui/label"

export function LoginForm() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {Object.values(providerMap).map((provider) => (
                        <form
                            action={async () => {
                                "use server"
                                try {
                                    await signIn(provider.id)
                                    redirect("/profile");
                                } catch (error) {
                                    // Signin can fail for a number of reasons, such as the user
                                    // not existing, or the user not having the correct role.
                                    // In some cases, you may want to redirect to a custom error
                                    if (error instanceof AuthError) {
                                        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                                    }

                                    // Otherwise if a redirects happens NextJS can handle it
                                    // so you can just re-thrown the error and let NextJS handle it.
                                    // Docs:
                                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                                    throw error
                                }
                            }}
                        >
                            <Button type="submit">
                                <span>Sign in with {provider.name}</span>
                            </Button>
                        </form>
                    ))}
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
