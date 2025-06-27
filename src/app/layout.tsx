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
        <div className="fixed inset-0 z-0">
        </div>
       <div className="relative z-10">
          <main className="min-h-screen flex flex-col items-center justify-center">
            {children}
          </main>
          <footer className="w-full py-6 text-center text-xs text-gray-500 border-t border-gray-800 mt-12">
            &copy; {new Date().getFullYear()} Abhijith J Nair. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
