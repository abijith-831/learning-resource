"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx"; 
import Image from "next/image";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white text-white px-[60px] py-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] border-2 border-transparent">
      <div className="flex justify-between items-center">
      <div className="relative w-[150px] h-[60px]">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </div>


        {/* Hamburger Icon */}
        <button
          className="block md:hidden bg-none border-none text-black"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {["Home", "Courses", "Services", "Contact",'Login'].map((item) => (
            <li
              key={item}
              className="cursor-pointer text-black font-bold px-5 py-2 rounded-full hover:bg-black hover:text-white hover:border-black hover:border-2 transition duration-300 ease-in-out"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-500 ease-in-out md:hidden",
          isOpen ? "max-h-[500px] scale-100 opacity-100" : "max-h-0 scale-95 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-3 mt-4">
          {["Home", "Courses", "Services", "Contact",'Login'].map((item) => (
            <li
              key={item}
              className="cursor-pointer font-bold px-5 py-2 text-black rounded-full hover:bg-black hover:text-white hover:border-black hover:border-2 transition duration-300 ease-in-out"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
