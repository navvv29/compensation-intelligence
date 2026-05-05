import { normalizeCompany } from './normalize';

export interface DemoSalary {
  id: string;
  company: string;
  role: string;
  level: string;
  location: string;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  confidence_score: number;
  createdAt: Date;
}

type SalaryInput = Omit<DemoSalary, 'id' | 'total_compensation' | 'confidence_score' | 'createdAt'>;
type SortableSalaryField = 'base_salary' | 'bonus' | 'stock' | 'total_compensation' | 'experience_years' | 'createdAt';

const createdAt = new Date('2026-01-01T00:00:00.000Z');

const salaries: SalaryInput[] = [
  { company: 'google', role: 'SDE', level: 'L3', location: 'Bengaluru', experience_years: 1, base_salary: 2200000, bonus: 200000, stock: 500000 },
  { company: 'google', role: 'SDE', level: 'L3', location: 'Bengaluru', experience_years: 2, base_salary: 2400000, bonus: 250000, stock: 600000 },
  { company: 'google', role: 'SDE II', level: 'L4', location: 'Bengaluru', experience_years: 4, base_salary: 3500000, bonus: 400000, stock: 1500000 },
  { company: 'google', role: 'SDE II', level: 'L4', location: 'Hyderabad', experience_years: 5, base_salary: 3600000, bonus: 400000, stock: 1600000 },
  { company: 'google', role: 'Senior SDE', level: 'L5', location: 'Bengaluru', experience_years: 7, base_salary: 5500000, bonus: 800000, stock: 2500000 },
  { company: 'google', role: 'Staff Engineer', level: 'L6', location: 'Bengaluru', experience_years: 10, base_salary: 8000000, bonus: 1500000, stock: 5000000 },
  { company: 'google', role: 'SDE', level: 'L3', location: 'San Francisco', experience_years: 1, base_salary: 140000, bonus: 20000, stock: 40000 },
  { company: 'google', role: 'SDE II', level: 'L4', location: 'San Francisco', experience_years: 4, base_salary: 175000, bonus: 25000, stock: 70000 },
  { company: 'google', role: 'Senior SDE', level: 'L5', location: 'San Francisco', experience_years: 7, base_salary: 215000, bonus: 35000, stock: 120000 },
  { company: 'microsoft', role: 'SDE', level: 'L59', location: 'Hyderabad', experience_years: 1, base_salary: 1500000, bonus: 150000, stock: 300000 },
  { company: 'microsoft', role: 'SDE', level: 'L3', location: 'Hyderabad', experience_years: 1, base_salary: 1500000, bonus: 150000, stock: 300000 },
  { company: 'microsoft', role: 'SDE II', level: 'L4', location: 'Bengaluru', experience_years: 4, base_salary: 2500000, bonus: 250000, stock: 600000 },
  { company: 'microsoft', role: 'Senior SDE', level: 'L5', location: 'Bengaluru', experience_years: 8, base_salary: 4000000, bonus: 500000, stock: 1500000 },
  { company: 'microsoft', role: 'Principal SDE', level: 'L6', location: 'Hyderabad', experience_years: 12, base_salary: 6000000, bonus: 1000000, stock: 3000000 },
  { company: 'microsoft', role: 'SDE II', level: 'L4', location: 'Seattle', experience_years: 5, base_salary: 160000, bonus: 20000, stock: 40000 },
  { company: 'microsoft', role: 'Senior SDE', level: 'L5', location: 'Seattle', experience_years: 8, base_salary: 190000, bonus: 30000, stock: 60000 },
  { company: 'amazon', role: 'SDE I', level: 'L3', location: 'Bengaluru', experience_years: 1, base_salary: 1800000, bonus: 300000, stock: 400000 },
  { company: 'amazon', role: 'SDE II', level: 'L4', location: 'Bengaluru', experience_years: 3, base_salary: 3000000, bonus: 0, stock: 1200000 },
  { company: 'amazon', role: 'SDE II', level: 'L4', location: 'Delhi', experience_years: 4, base_salary: 3200000, bonus: 0, stock: 1300000 },
  { company: 'amazon', role: 'SDE III', level: 'L5', location: 'Bengaluru', experience_years: 7, base_salary: 5000000, bonus: 0, stock: 2500000 },
  { company: 'amazon', role: 'SDE I', level: 'L3', location: 'Seattle', experience_years: 1, base_salary: 135000, bonus: 25000, stock: 15000 },
  { company: 'amazon', role: 'SDE II', level: 'L4', location: 'Seattle', experience_years: 4, base_salary: 170000, bonus: 0, stock: 50000 },
  { company: 'flipkart', role: 'SDE I', level: 'L3', location: 'Bengaluru', experience_years: 1, base_salary: 1800000, bonus: 180000, stock: 200000 },
  { company: 'flipkart', role: 'SDE II', level: 'L4', location: 'Bengaluru', experience_years: 3, base_salary: 2800000, bonus: 280000, stock: 600000 },
  { company: 'flipkart', role: 'SDE III', level: 'L5', location: 'Bengaluru', experience_years: 6, base_salary: 4500000, bonus: 450000, stock: 1500000 },
  { company: 'flipkart', role: 'Data Scientist', level: 'L4', location: 'Bengaluru', experience_years: 4, base_salary: 2600000, bonus: 260000, stock: 500000 },
  { company: 'swiggy', role: 'SDE I', level: 'L3', location: 'Bengaluru', experience_years: 2, base_salary: 2000000, bonus: 0, stock: 300000 },
  { company: 'swiggy', role: 'SDE II', level: 'L4', location: 'Bengaluru', experience_years: 4, base_salary: 3300000, bonus: 0, stock: 800000 },
  { company: 'swiggy', role: 'SDE III', level: 'L5', location: 'Bengaluru', experience_years: 7, base_salary: 5200000, bonus: 0, stock: 2000000 },
  { company: 'swiggy', role: 'PM', level: 'L4', location: 'Bengaluru', experience_years: 5, base_salary: 3000000, bonus: 300000, stock: 600000 },
  { company: 'swiggy', role: 'Senior PM', level: 'L5', location: 'Bengaluru', experience_years: 8, base_salary: 4800000, bonus: 500000, stock: 1200000 },
  { company: 'apple', role: 'ICT2', level: 'L3', location: 'San Francisco', experience_years: 2, base_salary: 150000, bonus: 15000, stock: 45000 },
  { company: 'apple', role: 'ICT3', level: 'L4', location: 'San Francisco', experience_years: 5, base_salary: 185000, bonus: 25000, stock: 80000 },
  { company: 'apple', role: 'ICT4', level: 'L5', location: 'San Francisco', experience_years: 8, base_salary: 220000, bonus: 40000, stock: 130000 },
];

export const demoSalaries: DemoSalary[] = salaries.map((salary, index) => ({
  ...salary,
  id: `demo-${index + 1}`,
  total_compensation: salary.base_salary + salary.bonus + salary.stock,
  confidence_score: 1,
  createdAt,
}));

function getSort(sort: string | null): { field: SortableSalaryField; direction: 'asc' | 'desc' } {
  const direction = sort?.endsWith('_asc') ? 'asc' : 'desc';
  const field = sort?.replace(/_(asc|desc)$/, '') as SortableSalaryField | undefined;
  const allowedFields: SortableSalaryField[] = ['base_salary', 'bonus', 'stock', 'total_compensation', 'experience_years', 'createdAt'];

  return {
    field: field && allowedFields.includes(field) ? field : 'total_compensation',
    direction,
  };
}

export function findDemoSalaries(searchParams: URLSearchParams): DemoSalary[] {
  const company = normalizeCompany(searchParams.get('company') || '');
  const role = searchParams.get('role')?.trim().toLowerCase();
  const level = searchParams.get('level')?.trim().toUpperCase();
  const location = searchParams.get('location')?.trim().toLowerCase();
  const { field, direction } = getSort(searchParams.get('sort'));

  return demoSalaries
    .filter((salary) => {
      if (company && salary.company !== company) return false;
      if (role && !salary.role.toLowerCase().includes(role)) return false;
      if (level && salary.level !== level) return false;
      if (location && !salary.location.toLowerCase().includes(location)) return false;
      return true;
    })
    .sort((a, b) => {
      const aValue = a[field] instanceof Date ? a[field].getTime() : a[field];
      const bValue = b[field] instanceof Date ? b[field].getTime() : b[field];
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
}

export function findDemoCompany(company: string): DemoSalary[] {
  const normalizedCompany = normalizeCompany(company);
  return demoSalaries
    .filter((salary) => salary.company === normalizedCompany)
    .sort((a, b) => b.total_compensation - a.total_compensation);
}

export function findDemoSalary(id: string): DemoSalary | undefined {
  return demoSalaries.find((salary) => salary.id === id);
}
