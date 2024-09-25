// apps/frontend/app/layout.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from './context/ThemeContext';
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const displayNavbar =
    pathname !== "/" &&
    pathname !== "/login" &&
    pathname !== "/Login" &&
    pathname !== "/signup";

  return (
    <html lang="en">
      <head>
        {/* Add any meta tags, title, etc. here */}
      </head>
      <body>
        <ThemeProvider>
          {displayNavbar && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
