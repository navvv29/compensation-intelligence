import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { normalizeCompany } from '@/lib/normalize';
import { findDemoSalaries } from '@/lib/sample-salaries';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const company = searchParams.get('company');
    const role = searchParams.get('role');
    const level = searchParams.get('level');
    const location = searchParams.get('location');
    const sort = searchParams.get('sort');

    const where: Prisma.SalaryWhereInput = {};
    if (company) where.company = normalizeCompany(company);
    if (role) where.role = { contains: role, mode: 'insensitive' };
    if (level) where.level = level.toUpperCase();
    if (location) where.location = { contains: location, mode: 'insensitive' };

    let orderBy: Prisma.SalaryOrderByWithRelationInput = { total_compensation: 'desc' };
    const sortableFields = new Set<keyof Prisma.SalaryOrderByWithRelationInput>([
      'base_salary',
      'bonus',
      'stock',
      'total_compensation',
      'experience_years',
      'createdAt',
    ]);
    
    if (sort) {
      const direction = sort.endsWith('_asc') ? 'asc' : 'desc';
      const field = sort.replace(/_(asc|desc)$/, '') as keyof Prisma.SalaryOrderByWithRelationInput;

      if (sortableFields.has(field)) {
        orderBy = { [field]: direction };
      }
    }

    const salaries = await prisma.salary.findMany({
      where,
      orderBy,
    });

    return NextResponse.json(salaries);

  } catch (error) {
    console.error('Fetch salaries error:', error);
    const { searchParams } = new URL(req.url);
    return NextResponse.json(findDemoSalaries(searchParams));
  }
}
