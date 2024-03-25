import { PeriodEnum } from '../types';

export function calculateStartDate(period: PeriodEnum): Date {
  const startDate = new Date();

  switch (period) {
    case PeriodEnum.WEEK:
      startDate.setDate(startDate.getDate() - 7);
      break;
    case PeriodEnum.MONTH:
      startDate.setDate(startDate.getDate() - 30);
      break;
    case PeriodEnum.THREE_MONTHS:
      startDate.setDate(startDate.getDate() - 90);
      break;
    case PeriodEnum.LAST_YEAR:
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
  }

  return startDate;
}