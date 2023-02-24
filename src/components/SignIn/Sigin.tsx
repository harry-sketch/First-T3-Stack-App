import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => void signIn()}
        type="button"
        className="rounded-xl border border-slate-400 p-2.5 text-2xl font-bold text-slate-50"
      >
        SigIn Using Gitub
      </button>
    </div>
  );
};

export default SignIn;
