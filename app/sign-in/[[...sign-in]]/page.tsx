import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center py-10">
      <SignIn
        fallbackRedirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </section>
  );
}
