import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import getUser from "@/libs/actions/getUser";
import { MdSettings } from "react-icons/md";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    async function fetch() {
      const user_id = Cookie.get("user_id");
      const res = await getUser(user_id);
      const user = JSON.parse(res || "{}");
      setProfileUrl(user.imageUrl);
    }
    fetch();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center flex-wrap bg-gray-800 p-3">
        <Link href="/">
          <div className="inline-flex items-center p-2 mr-4 cursor-pointer">
            <Image
              src="/Images/logo2.png"
              alt="Logo"
              width={80}
              height={80}
              className="mr-2 rounded-full border border-white"
            />
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              ABC TRAVEL PLANNER
            </span>
          </div>
        </Link>
        <button
          className="inline-flex p-3 hover:bg-gray-200 hover:text-gray-800 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? "" : "hidden"
          } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <Link href="/home">
              <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800">
                Home
              </div>
            </Link>
            <Link href="/search">
              <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800">
                Search
              </div>
            </Link>

            <Link href="/itinerary">
              <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800">
                Itineraries
              </div>
            </Link>
            <Link href="/account">
              <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800">
                Account
              </div>
            </Link>
            <Link href="/help">
              <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800">
                Help ?
              </div>
            </Link>
            <Link href="/settings">
              <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800">
                <MdSettings className="w-6 h-6" />
              </div>
            </Link>
            {/* image for profile */}
            {profileUrl && (
              <div className="flex items-center justify-center">
                <Image
                  src={profileUrl}
                  alt="Avatar"
                  width={32}
                  height={32}
                  style={{ minHeight: "32px", minWidth: "32px" }}
                  className="ml-2 rounded-full border border-white overflow-hidden"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Add padding to the body to prevent content from being hidden behind the fixed navbar */}
      <div className="pt-20">{/* Your page content here */}</div>
    </>
  );
};
