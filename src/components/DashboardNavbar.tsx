import Image from "next/image";
import logo from "../../public/logo1.png";
import {UserButton} from "@clerk/nextjs";
import Link from "next/link";
import CustomUserDropdown from "@/components/CustomUserDropdown";

const Navbar = () => {

    return (
        <nav className="w-full h-[80px] flex items-center justify-between bg-transparent px-5 sm:px-10 md:px-20">
            <Link href="/">
                <Image
                    src={logo}
                    alt="logo"
                    width={280}
                    height={280}
                    className="z-[50] mix-blend-multiply cursor-pointer h-16 w-auto"
                />
            </Link>
            <div>
                <CustomUserDropdown />
            </div>
        </nav>
    );
};

export default Navbar;
