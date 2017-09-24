/**
 * Created by matth on 2/26/2017.
 */


export type PartsOfDay =
  "Morning"
  | "Afternoon"
  | "Evening"

export type ColorFilters =
  "light"
  | "sepia"
  | "dark"


export const PartsOfDayEnum = {
  Morning: 'Morning' as 'Morning',
  Afternoon: 'Afternoon' as 'Afternoon',
  Evening: 'Evening' as 'Evening',
};

const isMorning = (h:number):boolean  => (h >= 6 && h <= 11);
const isAfterNoon = (h:number):boolean  => (h >= 12 && h <= 16);
const isEvening = (h:number):boolean  => (h >= 17 || h <= 5);

export function getPartOfDay(date: Date): (PartsOfDay) {
  const hours = date.getHours();

  if (isEvening(hours)) {
    return PartsOfDayEnum.Evening;
  } else if (isAfterNoon(hours)) {
    return PartsOfDayEnum.Afternoon
  } else if (isMorning(hours)) {
    return PartsOfDayEnum.Morning;
  }
}
