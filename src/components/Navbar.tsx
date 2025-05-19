"use client";

import Image from "next/image";
import logo from "../../public/logo1.png";
import { useRouter } from "next/navigation";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full h-[80px] flex items-center justify-between bg-transparent">
        <div className="relative left-10"></div>
      <Image
        src={logo}
        alt="logo"
        width={280}
        height={280}
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
        className="z-[50] mix-blend-multiply"
      />
        <div className="relative right-10">
            <SignedOut>
                <div className="flex items-center justify-center gap-3">
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
            </SignedOut>
            <SignedIn>
                <div className="flex items-center justify-center gap-5">
                    <Link href="/dashboard">Dashboard</Link>
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10"
                        }
                    }} />
                </div>
            </SignedIn>
        </div>
    </nav>
  );
};

export default Navbar;
