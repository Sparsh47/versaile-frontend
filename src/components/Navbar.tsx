"use client";

import Image from "next/image";
import logo from "../../public/logo1.png";
import {SignedIn, SignedOut, SignInButton, SignUpButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {useState} from "react";
import CustomUserDropdown from "@/components/CustomUserDropdown";

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <nav className="absolute top-0 w-full h-[80px] flex items-center justify-between bg-transparent">
        <div className="relative left-10 hidden md:block"></div>
      <Link href="/" className="relative md:translate-x-1/3">
          <Image
              src={logo}
              alt="logo"
              width={280}
              height={180}
              className="z-[50] h-16 w-auto mix-blend-multiply"
          />
      </Link>
        <div className="relative right-4 sm:right-10">
            <SignedOut>
                <div className="hidden md:flex items-center justify-center gap-3">
                    <SignInButton>
                        <Button
                            className="h-[40px] rounded-full py-5 px-8 font-medium text-sm"
                        >
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button
                            variant="outline"
                            className="h-[40px] rounded-full py-5 px-8 font-medium text-sm"
                        >
                            Sign Up
                        </Button>
                    </SignUpButton>
                </div>
                <div className="relative flex-col flex md:hidden">
                    <EllipsisVerticalIcon className="w-8 h-8 text-gray-950 hover:bg-[rgba(0,0,0,0.1)] rounded-full cursor-pointer p-1" onClick={()=>setOpenMenu(prev=>!prev)} />
                    {openMenu && <div
                        className="absolute flex flex-col w-32 p-2 bg-[rgba(255,255,255,0.5)] rounded-sm shadow-md -bottom-24 right-2">
                        <SignInButton>
                            <Button
                                className="hover:bg-[rgba(0,0,0,0.1)] bg-transparent shadow-none text-black"
                            >
                                Sign In
                            </Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button
                                className="hover:bg-[rgba(0,0,0,0.1)] bg-transparent shadow-none text-black"
                            >
                                Sign Up
                            </Button>
                        </SignUpButton>
                    </div>}
                </div>
            </SignedOut>
            <SignedIn>
                <CustomUserDropdown />
            </SignedIn>
        </div>
    </nav>
  );
};

export default Navbar;
