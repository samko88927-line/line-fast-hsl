import Link from "next/link";
import NextImage from "next/image";
import { NavigationMenu } from "./main-nav";
import Container from "@/components/ui/container";
import { Category } from "@/types";
import SignInButton from "./sign-in-button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { IconSettings } from "@tabler/icons-react";
import { redirect, useRouter } from "next/navigation";

// import getCategories from "@/actions/get-categories";
const Navbar = () => {
  // const categories = await getCategories();
  const categories: Category[] = [];
  const { userId } = auth();

  return (
    <div className="fixed top-0 z-50 w-full bg-black border-b-[1px] border-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex items-center px-8">
        <div className="flex items-center justify-between w-full  h-16 px-4 rounded-b-2xl ">
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="ml-4 flex lg:ml-0 gap-x-2 pr-8 items-center"
            >
              <NextImage
                src="/img/logo.png"
                alt="西寧小丸子logo"
                width={44}
                height={44}
                className="w-8 h-8 rounded-full"
              />
              <p className="font-bold text-xl uppercase text-white">
                西寧小丸子
              </p>
            </Link>
            <NavigationMenu data={categories} />
          </div>
          {/* <NavbarActions /> */}
          {userId ? (
            <div className="flex items-center justify-center gap-2">
              <Link href="/profile">
                <IconSettings className="h-8 w-8 text-neutral-500" />
              </Link>
              <UserButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
