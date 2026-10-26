import type { StoreDayHours, WeekDay } from "../types/store-profile.types";

export const WEEK_DAY_LABELS: Record<WeekDay, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

// Date.getDay(): 0 = domingo ... 6 = sábado
const DAY_BY_JS_INDEX: WeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getTodayWeekDay(date: Date = new Date()): WeekDay {
  return DAY_BY_JS_INDEX[date.getDay()];
}

export function isDayClosed(hours: StoreDayHours): boolean {
  return hours.open === null || hours.close === null;
}

function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const hourLabel = String(Number(hour));
  return minute && Number(minute) > 0 ? `${hourLabel}h${minute}` : `${hourLabel}h`;
}

export function formatDayHours(hours: StoreDayHours): string {
  if (hours.open === null || hours.close === null) return "Fechado";
  return `${formatTime(hours.open)} às ${formatTime(hours.close)}`;
}
