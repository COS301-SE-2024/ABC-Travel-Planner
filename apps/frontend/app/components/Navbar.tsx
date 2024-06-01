import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className='flex items-center flex-wrap bg-gray-800 p-3'>
        <Link href='/'>
          <div className='inline-flex items-center p-2 mr-4 cursor-pointer'>
            <Image
              src='/Images/logo2.png' // Replace with the path to your logo
              alt='Logo'
              width={80} // Adjust these values as needed
              height={80}
              className='mr-2 rounded-full border border-white' // Add rounded border to the logo
            />
            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              ABC TRAVEL PLANNER
            </span>
          </div>
        </Link>
        <button
          className='inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div
          className={`${
            active ? '' : 'hidden'
          } w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto'>
            <Link href='/home'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800'> {/* Change hover colors to light grey */}
                Home
              </div>
            </Link>
            <Link href='/search'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800'> {/* Change hover colors to light grey */}
                Search
              </div>
            </Link>
            <Link href='/destinations'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800'> {/* Change hover colors to light grey */}
                Destinations
              </div>
            </Link>
            <Link href='/itinerary'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800'> {/* Change hover colors to light grey */}
                Itinerary
              </div>
            </Link>
            <Link href='/booking'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800'> {/* Change hover colors to light grey */}
                Booking
              </div>
            </Link>
            <Link href='/account'>
              <div className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-gray-200 hover:text-gray-800'> {/* Change hover colors to light grey */}
                Account
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
