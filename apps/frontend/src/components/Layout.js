// Layout.js
import Link from 'next/link';
import '../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-around">
          <Link  className="nav-label" href="/">Home</Link>
          <Link  className="nav-label" href="/search">Search</Link>
          <Link className="nav-label" href="/destinations">Destinations</Link>
          <Link className="nav-label" href="/itinerary">Itinerary</Link>
          <Link className="nav-label" href="/booking">Booking</Link>
          <Link className="nav-label" href="/reviews">Reviews</Link>
          <Link className="nav-label"href="/account">Account</Link>
        </nav> 
      </header>
      <main className="flex-grow p-4 pt-8 pb-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 ABC Travel Planner. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
