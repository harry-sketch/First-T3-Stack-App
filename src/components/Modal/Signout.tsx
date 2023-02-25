import React, { useRef } from "react";
import { signOut } from "next-auth/react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  name: string | null | undefined;
  onclose: () => void;
}

const SignOut: React.FC<Props> = ({ name, onclose }) => {
  const closeRef = useRef(null);

  useOnClickOutside(closeRef, onclose);
  return (
    <div
      className="absolute right-5 top-16 w-36 rounded-lg border border-slate-900 bg-gray-300/25 p-2.5"
      ref={closeRef}
    >
      <div className="text-xl font-bold capitalize text-slate-50">{name}</div>
      <button
        type="button"
        className="text-base font-semibold"
        onClick={() => void signOut()}
      >
        SignOut
      </button>
    </div>
  );
};

export default React.memo(SignOut);
