import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Abhijith J Nair',
  description: 'AI & ML Developer, Intermediate Full Stack Developer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className=" relative bg-[#030303] text-gray-100 overflow-x-hidden">
        <div className="fixed inset-0 z-0 w-full">
        </div>
       <div className="relative z-10 w-full">
          <main className="min-h-screen flex flex-col items-center justify-center">
            {children}
          </main>
          <footer className="w-full py-6 px-48 text-left flex justify-between font-satoshi  text-md text-gray-300 border-t border-gray-900">
            &copy; {new Date().getFullYear()} Abhijith J Nair. All rights reserved.
            <p>
              Bye Bee!!
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
