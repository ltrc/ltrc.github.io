import type { CollectionEntry } from 'astro:content';

export type Member = CollectionEntry<'people'>['data']['members'][number];

/** Person categories, in display order, mirroring the /people/<type> routes. */
export const PEOPLE_CATEGORIES = [
  { type: 'faculty', label: 'Faculty', href: '/people/faculty', description: 'Faculty members at LTRC, IIIT Hyderabad.' },
  { type: 'staff', label: 'Staff', href: '/people/staff', description: 'Research scientists, engineers, and staff at LTRC.' },
  { type: 'phd', label: 'PhD Students', href: '/people/phd', description: 'PhD research scholars at LTRC.' },
  { type: 'ms', label: 'MS Students', href: '/people/ms', description: 'MS by Research students at LTRC.' },
  { type: 'btech', label: 'BTech Students', href: '/people/btech', description: 'Undergraduate research students at LTRC.' },
  { type: 'alumni', label: 'Alumni', href: '/people/alumni', description: 'Past students, researchers, and faculty of LTRC.' },
] as const;

const STUDENT_TYPES = ['phd', 'ms', 'btech'];

/** Members of a single category type, preserving source order. */
export function membersByType(members: Member[], type: string): Member[] {
  return members.filter((m) => m.type === type);
}

/** Headline counts used on the homepage. */
export function countPeople(members: Member[]): { faculty: number; students: number } {
  return {
    faculty: members.filter((m) => m.type === 'faculty').length,
    students: members.filter((m) => STUDENT_TYPES.includes(m.type || '')).length,
  };
}
