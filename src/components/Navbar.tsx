import React from 'react'

const Navbar = () => {
  return (
    <div>
       <nav className="bg-transparent z-50 flex">
          <li className="flex w-screen justify-evenly font-monojb ">
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">About</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Works</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Skills</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Contact</ul>
          </li>
        </nav>
    </div>
  )
}

export default Navbar
