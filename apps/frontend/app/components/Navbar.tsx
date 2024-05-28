// apps/frontend/app/components/Navbar.tsx

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/search">Search</Link></li>
                <li><Link href="/destinations">Destinations</Link></li>
                <li><Link href="/itinerary">Itinerary</Link></li>
                <li><Link href="/booking">Booking</Link></li>
                <li><Link href="/reviews">Review</Link></li>
                <li><Link href="/account">Account</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
