// apps/frontend/app/layout.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import './globals.css';  // Import the global styles from the app folder


const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <html lang="en">
            <body>
                {pathname !== '/' && <Navbar />}
                {children}
            </body>
        </html>
    );
};

export default Layout;
