import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInForm({
    onSubmit,
}: {
    onSubmit: (formData: FormData) => Promise<void>
}) {
    return (
        <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" type="email" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
                Sign In
            </Button>
        </form>
    )
}

