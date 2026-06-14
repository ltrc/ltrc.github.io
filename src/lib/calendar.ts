import type { CollectionEntry } from 'astro:content';

type EventsData = CollectionEntry<'events'>['data'];

/** Minimal shape the interactive Calendar component renders from. */
export interface CalEvent {
  title: string;
  start: string;
  end: string;
  link: string | null;
}

/**
 * Shapes an events collection into calendar props: plain date-string events
 * plus the month to open on (next upcoming event, else most recent past
 * event, else the current month).
 */
export function getCalendarData(events: EventsData): {
  calEvents: CalEvent[];
  initialYear: number;
  initialMonth: number;
} {
  const calEvents: CalEvent[] = [...(events.upcoming ?? []), ...(events.past ?? [])].map((e) => ({
    title: e.title,
    start: e.date,
    end: e.end_date || e.date,
    link: e.link || null,
  }));

  const upcomingStarts = (events.upcoming ?? []).map((e) => e.date).sort();
  const pastStarts = (events.past ?? []).map((e) => e.date).sort().reverse();
  const initialDateStr = upcomingStarts[0] || pastStarts[0] || new Date().toISOString().slice(0, 10);
  const initialDate = new Date(`${initialDateStr}T00:00:00`);

  return {
    calEvents,
    initialYear: initialDate.getFullYear(),
    initialMonth: initialDate.getMonth(),
  };
}
