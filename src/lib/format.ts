/** Formats an ISO date string (or Date) as a readable en-IN date. */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  return new Date(date).toLocaleDateString('en-IN', options);
}
