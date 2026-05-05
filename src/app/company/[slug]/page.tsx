"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Building2, ArrowLeft, TrendingUp, Users, Layers } from 'lucide-react';

interface Salary {
  id: string;
  role: string;
  level: string;
  location: string;
  experience_years: number;
  total_compensation: number;
  base_salary: number;
  bonus: number;
  stock: number;
}

interface CompanyData {
  salaries: Salary[];
  median_compensation: number;
  level_distribution: Record<string, number>;
}

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/company/${encodeURIComponent(slug)}`);
        if (res.status === 404) {
          setError('Company not found');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch data');
        const json = await res.json();
        setData(json);
      } catch {
        setError('Error loading company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug]);

  const formatCurrency = (val: number) => {
    if (val >= 100000 && val < 10000000) {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
          <div className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
        </div>
        <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Building2 className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" />
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{error || "Not found"}</h1>
        <p className="text-zinc-500 mb-6">We don&apos;t have enough data for this company yet.</p>
        <Link href="/salaries" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all salaries
        </Link>
      </div>
    );
  }

  // Calculate max count for level distribution bars
  const maxLevelCount = Math.max(...Object.values(data.level_distribution));
  // Sort levels
  const sortedLevels = Object.entries(data.level_distribution).sort((a, b) => a[0].localeCompare(b[0]));
  // Level colors
  const levelColors: Record<string, string> = {
    'L3': 'from-blue-500 to-blue-600',
    'L4': 'from-indigo-500 to-indigo-600',
    'L5': 'from-violet-500 to-violet-600',
    'L6': 'from-purple-500 to-purple-600',
    'L7': 'from-fuchsia-500 to-fuchsia-600',
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/salaries" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-4xl font-extrabold capitalize tracking-tight">{decodeURIComponent(slug)}</h1>
          <p className="text-sm text-zinc-500 mt-1">{data.salaries.length} salary data points</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Median Card */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between">
          <div>
            <h2 className="text-blue-100 font-medium flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" /> Median Total Compensation
            </h2>
            <p className="text-sm text-blue-200/80">Across all roles and levels</p>
          </div>
          <div className="text-5xl font-black tracking-tight mt-6">
            {formatCurrency(data.median_compensation)}
          </div>
        </div>

        {/* Level Distribution */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-400" />
            Level Distribution
          </h2>
          <div className="flex flex-col gap-3">
            {sortedLevels.map(([level, count]) => (
              <div key={level} className="flex items-center gap-3">
                <div className="w-10 text-sm font-semibold">{level}</div>
                <div className="flex-1 h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${levelColors[level] || 'from-blue-500 to-blue-600'} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${(count / maxLevelCount) * 100}%` }}
                  ></div>
                </div>
                <div className="w-10 text-right text-sm font-medium text-zinc-500 flex items-center gap-1 justify-end">
                  <Users className="w-3 h-3" />{count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Reported Salaries ({data.salaries.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Role</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Level</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Location</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Exp</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Base</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Bonus</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Stock</th>
                <th className="px-6 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Total Comp</th>
              </tr>
            </thead>
            <tbody>
              {data.salaries.map((s) => (
                <tr key={s.id} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-sm">{s.role}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                      {s.level}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-zinc-600 dark:text-zinc-400">{s.location}</td>
                  <td className="px-6 py-3 text-sm">{s.experience_years}y</td>
                  <td className="px-6 py-3 text-sm text-zinc-500">{formatCurrency(s.base_salary)}</td>
                  <td className="px-6 py-3 text-sm text-zinc-500">{formatCurrency(s.bonus)}</td>
                  <td className="px-6 py-3 text-sm text-zinc-500">{formatCurrency(s.stock)}</td>
                  <td className="px-6 py-3 font-semibold text-green-700 dark:text-green-400">{formatCurrency(s.total_compensation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
