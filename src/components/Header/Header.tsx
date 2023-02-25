import Image from "next/image";
import { useState } from "react";

// auth
import { useSession } from "next-auth/react";
import SignOut from "../Modal/Signout";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  const toggle = () => setIsOpen((prev) => !prev);

  const onclose = () => setIsOpen(false);

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
            onClick={toggle}
          />
        ) : null}
      </div>

      {isOpen ? <SignOut name={session?.user.name} onclose={onclose} /> : null}
    </nav>
  );
};

export default Header;
