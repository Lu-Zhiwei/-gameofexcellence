'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Game of Excellence</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/tools/watermark-remover" className="px-3 py-2 rounded-md hover:bg-blue-700">
              Watermark Remover
            </Link>
            <Link href="/tools/id-photo-background" className="px-3 py-2 rounded-md hover:bg-blue-700">
              ID Photo Background
            </Link>
            <Link href="/tools/transparent-maker" className="px-3 py-2 rounded-md hover:bg-blue-700">
              Transparent Maker
            </Link>
            <Link href="/tools/image-splitter" className="px-3 py-2 rounded-md hover:bg-blue-700">
              Image Splitter
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md hover:bg-blue-700">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md hover:bg-blue-700">
              Contact
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/tools/watermark-remover" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Watermark Remover
            </Link>
            <Link 
              href="/tools/id-photo-background" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              ID Photo Background
            </Link>
            <Link 
              href="/tools/transparent-maker" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Transparent Maker
            </Link>
            <Link 
              href="/tools/image-splitter" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Image Splitter
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 