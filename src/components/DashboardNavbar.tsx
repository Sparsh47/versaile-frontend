import Image from "next/image";
import logo from "../../public/logo1.png";
import {UserButton} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {

    return (
        <nav className="w-full h-[80px] flex items-center justify-between bg-transparent px-20">
            <Link href="/">
                <Image
                    src={logo}
                    alt="logo"
                    width={280}
                    height={280}
                    className="z-[50] mix-blend-multiply cursor-pointer h-52 w-auto"
                />
            </Link>
            <div>
                <UserButton appearance={{
                    elements: {
                        userButtonAvatarBox: "w-10 h-10"
                    }
                }} />
            </div>
        </nav>
    );
};

export default Navbar;
