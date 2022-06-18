import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/icons/logo';

function AuthNav() {
  return (
    <div className="relative flex w-full text-white md:px-2 py-10 justify-between items-center z-10">
      <Link href="/app/dashboard">
        <a className=" flex space-x-[11px] items-center whitespace-nowrap">
          <span>
            <Logo />
          </span>
          <span className="hidden tracking-tighter md:text-brand text-[30.4024px] font-medium font-poppins text-black dark:text-white">
            SEO Content .Ai
          </span>
        </a>
      </Link>
      <div className="text md:text-xl font-poppins flex">
        <Link href="/signin">
          <a className="text-white h-[40.94px] flex items-center px-[29.49px] py-0 border border-white rounded-md cursor-pointer text-bold">
            <span className="text-[13.1067px]">Sign In</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default AuthNav;
