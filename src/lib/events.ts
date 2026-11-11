// Sends one of two events to the event counter (workers/events): a click on
// "Book a call" (termin) or a contact form Web3Forms accepted (formular).
// Only the event name and the page path leave the browser; no cookie, no ID.
// Empty site.eventsUrl = nothing is sent.
import { site } from '../site';

export type SiteEvent = 'termin' | 'formular';

export function track(event: SiteEvent) {
  if (!site.eventsUrl || !('sendBeacon' in navigator)) return;
  try {
    navigator.sendBeacon(site.eventsUrl, JSON.stringify({ e: event, p: location.pathname }));
  } catch {
    // Counting must never get in the way of booking or sending.
  }
}
