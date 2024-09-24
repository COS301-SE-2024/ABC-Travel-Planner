// apps/frontend/app/layout.tsx

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ChatBot from './components/Chatbot';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const displayNavbar =
    pathname !== "/" &&
    pathname !== "/login" &&
    pathname !== "/Login" &&
    pathname !== "/signup";

  return (
    <html lang="en">
      {/* <ThemeProvider> */}
      <body>
        {displayNavbar && <Navbar />}
        {children}
        <ChatBot />
      </body>
      {/* </ThemeProvider> */}
    </html>
  );
};

export default Layout;
