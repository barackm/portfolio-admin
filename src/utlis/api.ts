import moment from 'moment';

export const shouldFetchNow = (
  timeSaved: string,
  timeFormat: 'minutes' | 'hours' | 'seconds',
  comparisonTime: number,
) => {
  if (!timeSaved) return true;
  const timeSavedMoment = moment(timeSaved);
  const timeNow = moment();
  const timeDiff = timeNow.diff(timeSavedMoment, timeFormat);
  return timeDiff > comparisonTime;
};
