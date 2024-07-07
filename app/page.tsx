import { Button } from "@/components/ui/button"
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <Button asChild>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Register</RegisterLink>
      </Button>
    </div>
  )
}
