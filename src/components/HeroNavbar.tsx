import React from 'react'

const HeroNavbar = () => {
  return (
    <div>
       <nav className="bg-transparent flex space-x-4 font-satoshi font-light text-3xl">
          <li className="flex flex-col space-y-4">
            <ul className="text-transparent">About</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all">Skills</ul>
          </li>
          <li className="flex flex-col space-y-4">
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all text-right">About</ul>
            <ul className="cursor-pointer text-gray-300 hover:text-[#f18f01] transition-all text-right">Contact</ul>
          </li>
        </nav>
    </div>
  )
}

export default HeroNavbar
