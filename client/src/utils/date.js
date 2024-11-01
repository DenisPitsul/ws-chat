import { format } from 'date-fns';

export const formattedDate = dateString => {
  return format(dateString, 'yyyy.MM.dd HH:mm:ss');
};
