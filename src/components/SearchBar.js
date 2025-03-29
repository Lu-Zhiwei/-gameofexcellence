'use client';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // 实现搜索功能
    console.log('Searching for:', searchTerm);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search for tools..."
          className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
} 