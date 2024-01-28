"use client";

import Image from "next/image";
import logo from "../../../public/logo1.png";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full h-[80px] flex items-center justify-center bg-transparent">
      <Image
        src={logo}
        alt="logo"
        width={280}
        height={280}
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
        className="z-[50] mix-blend-multiply"
      />
    </nav>
  );
};

export default Navbar;
