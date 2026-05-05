"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Briefcase, BarChart3, ArrowRight, Layers, GitCompareArrows, Building2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (company) params.set('company', company);
    if (role) params.set('role', role);
    if (level) params.set('level', level);
    
    router.push(`/salaries?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] px-4 text-center">
      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/60 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 shadow-sm">
        <Layers className="h-3.5 w-3.5" />
        Levels {'>'} Titles — The Right Way to Compare Pay
      </div>
      
      {/* Hero Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 max-w-4xl leading-[1.1]">
        Standardized{' '}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Compensation
        </span>
        <br className="hidden md:block"/>
        Intelligence.
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Stop guessing based on job titles. Discover true market value anchored to{' '}
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">standardized engineering levels</span>{' '}
        across top tech companies.
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white dark:bg-zinc-900 shadow-xl dark:shadow-2xl dark:shadow-blue-900/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex-1 flex items-center bg-zinc-50 dark:bg-zinc-800/50 rounded-xl px-4 py-3 border border-zinc-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <Search className="h-5 w-5 text-zinc-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search company (e.g., Google)" 
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-3 text-zinc-900 dark:text-white placeholder:text-zinc-500"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 md:w-auto">
          <div className="flex-1 md:w-40 flex items-center bg-zinc-50 dark:bg-zinc-800/50 rounded-xl px-3 border border-zinc-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Briefcase className="h-4 w-4 text-zinc-400 shrink-0" />
            <select 
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 py-3 px-2 text-zinc-900 dark:text-white cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" className="dark:bg-zinc-800">All Roles</option>
              <option value="SDE" className="dark:bg-zinc-800">Software Engineer</option>
              <option value="PM" className="dark:bg-zinc-800">Product Manager</option>
              <option value="Data Scientist" className="dark:bg-zinc-800">Data Scientist</option>
            </select>
          </div>

          <div className="flex-1 md:w-32 flex items-center bg-zinc-50 dark:bg-zinc-800/50 rounded-xl px-3 border border-zinc-200 dark:border-zinc-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <BarChart3 className="h-4 w-4 text-zinc-400 shrink-0" />
            <select 
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 py-3 px-2 text-zinc-900 dark:text-white cursor-pointer"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="" className="dark:bg-zinc-800">All Levels</option>
              <option value="L3" className="dark:bg-zinc-800">L3 (Entry)</option>
              <option value="L4" className="dark:bg-zinc-800">L4 (Mid)</option>
              <option value="L5" className="dark:bg-zinc-800">L5 (Senior)</option>
              <option value="L6" className="dark:bg-zinc-800">L6 (Staff)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98]">
          Search
        </button>
      </form>

      {/* Feature Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <Link href="/salaries" className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 text-left">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Browse Salaries</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Explore comprehensive compensation data filterable by role, level, and location.</p>
          <div className="flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
        
        <Link href="/company/google" className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 text-left">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Company Insights</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">View detailed company profiles, median compensation, and level distributions.</p>
          <div className="flex items-center gap-1 mt-4 text-sm font-medium text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Google <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link href="/compare" className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 text-left">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <GitCompareArrows className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Compare Offers</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Evaluate two compensation packages side-by-side to make informed decisions.</p>
          <div className="flex items-center gap-1 mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Compare <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
