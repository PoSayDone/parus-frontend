'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  // Добавлена типизация события формы
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по сайту..."
        className="border border-gray-300 rounded px-4 py-2 w-full text-black"
      />
      <button 
        type="submit" 
        className="bg-[rgb(101,86,68)] text-white px-6 py-2 rounded-full border-b border-[rgb(207,197,187)] hover:opacity-90 transition-opacity"
      >
        Найти
      </button>
    </form>
  );
}