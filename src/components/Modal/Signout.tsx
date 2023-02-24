import React, { useRef } from "react";
import { signOut } from "next-auth/react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  onClose: () => void;
}

const SignOut: React.FC<Props> = ({ onClose }) => {
  const closeRef = useRef(null);

  useOnClickOutside(closeRef, onClose);
  return (
    <div
      className="absolute right-5 top-16 w-20 rounded-lg border border-slate-900 bg-gray-300/25 p-2.5"
      ref={closeRef}
    >
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
