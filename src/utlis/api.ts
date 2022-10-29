import moment from 'moment';

export const shouldFetchNow = (
  timeSaved: string,
  timeFormat: 'minutes' | 'hours' | 'seconds',
  comparisonTime: number,
) => {
  const currentTime = moment();
  const lastFetchTime = moment(timeSaved);
  const diff = currentTime.diff(lastFetchTime, timeFormat);
  return diff < comparisonTime;
};
