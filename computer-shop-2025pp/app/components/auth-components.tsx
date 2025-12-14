import { signIn, signOut } from "@/lib/auth"

export function SignIn({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof HTMLButtonElement>) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >
            <button {...props}>Zaloguj się z GitHub</button>
        </form>
    )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof HTMLButtonElement>) {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
            className="w-full"
        >
            <button className="w-full p-0" {...props}>
                Wyloguj się
            </button>
        </form>
    )
}