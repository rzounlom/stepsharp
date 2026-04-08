import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center py-10">
      <SignUp
        fallbackRedirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </section>
  );
}
