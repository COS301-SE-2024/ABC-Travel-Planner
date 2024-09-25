"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from './context/ThemeContext';
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
      <head>
        {/* Add any meta tags, title, etc. here */}
      </head>
      <body>
        <ThemeProvider>
          {displayNavbar && <Navbar />}
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;