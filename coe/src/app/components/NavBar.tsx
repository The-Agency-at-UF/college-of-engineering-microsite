"use client";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    //nav bar and gold border-b styling
    <header
      className="
        flex items-center
        h-[clamp(80px,10vw,120px)]
        bg-gradient-to-r from-[#002657] to-[#0021A5]
        border-b-[clamp(3px,0.4vw,4px)] border-b-transparent
        [border-image:linear-gradient(90deg,#774219_0%,#F2A900_100%)_1]">

      <div className="flex justify-between items-center w-full px-[clamp(16px,3vw,40px)]">
        {/*Left NavBar side: Logo */}
        <div className="flex items-center">
          <Image
            src="/images/LEGACY_CoE.svg"
            alt="Legacy 115th Logo"
            width={175}
            height={78}
            priority
            className="w-[clamp(80px,9vw,175px)] h-auto"/>
        </div>

        {/*Right NavBar side: Nav Links */}
         {/*TO DO: change the font */}
        <nav
          className="
          flex
          gap-[clamp(8px,5vw,60px)]
          text-white font-semibold
          text-[clamp(10px,1.5vw,24px)]">

          <Link href="/timeline" className="hover:text-[#F2A900] transition-colors">
            TIMELINE
          </Link>
          <Link href="/milestone" className="hover:text-[#F2A900] transition-colors">
          EVENTS
          </Link>
        </nav>
      </div>
    </header>
  );
}