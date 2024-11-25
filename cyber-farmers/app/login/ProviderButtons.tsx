"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { providerMap } from "@/auth"

export default function ProviderButtons({
    callbackUrl = "",
}: {
    callbackUrl?: string
}) {
    return (
        <div className="space-y-2">
            {Object.values(providerMap).map((provider) => (
                <Button
                    key={provider.id}
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn(provider.id, { callbackUrl })}
                >
                    Sign in with {provider.name}
                </Button>
            ))}
        </div>
    )
}

