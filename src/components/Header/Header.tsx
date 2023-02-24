import Image from "next/image";
import { useRef, useState } from "react";

// auth
import { useSession, signOut } from "next-auth/react";
import { useOnClickOutside } from "usehooks-ts";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cloeRef = useRef(null);

  const { data: session } = useSession();

  const onClose = () => setIsOpen((prev) => !prev);

  useOnClickOutside(cloeRef, onClose);

  return (
    <nav className="flex items-center justify-between py-2.5 text-slate-50">
      <div className="text-2xl font-semibold">Notes_App</div>

      <div>
        {session?.user.image ? (
          <Image
            src={session?.user.image}
            alt={session?.user.name ?? ""}
            width={40}
            height={40}
            className="relative cursor-pointer rounded-full"
            onClick={onClose}
          />
        ) : null}
      </div>

      {isOpen ? (
        <div
          className="absolute right-5 top-16 w-20 rounded-lg border border-slate-900 bg-gray-800 p-2.5"
          ref={cloeRef}
        >
          <button
            type="button"
            className="text-base font-semibold"
            onClick={() => void signOut()}
          >
            SignOut
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
