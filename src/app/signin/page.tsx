import { LoginForm } from "~/app/_components/login/login-form";

export default async function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    )
}
