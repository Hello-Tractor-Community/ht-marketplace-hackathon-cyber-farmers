import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import SignInForm from "./SignInForm"
import ProviderButtons from "./ProviderButtons"

const SIGNIN_ERROR_URL = "/signin-error"

export default async function SignInPage({
    searchParams,
}: {
    searchParams: { callbackUrl?: string }
}) {
    async function handleSignIn(formData: FormData) {
        "use server"
        try {
            await signIn("credentials", formData, { redirectTo: "/tractors" })
        } catch (error) {
            if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
            }
            throw error
        }
    }

    return (
        <div className="flex flex-col gap-6 max-w-sm mx-auto mt-10">
            <SignInForm onSubmit={handleSignIn} />
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <ProviderButtons callbackUrl={searchParams?.callbackUrl} />
        </div>
    )
}

