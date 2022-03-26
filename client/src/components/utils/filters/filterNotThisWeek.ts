import type { WorkoutInterface } from '../../../types';

export function filterNotThisWeek(item: WorkoutInterface) {
  const itemDate = new Date(item.createdAt);

  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
}
