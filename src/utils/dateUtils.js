export const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const isBefore = (date1, date2) => {
  return new Date(date1) < new Date(date2);
};

export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
};

export const isOverdue = (dueDate) => {
  const today = new Date();
  return new Date(dueDate) < today;
};

export const isDueToday = (dueDate) => {
  const today = new Date();
  return isSameDay(today, dueDate);
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const timeDiff = d2.getTime() - d1.getTime();
  return timeDiff / (1000 * 3600 * 24); 
};

export const isInFuture = (date) => {
  const today = new Date();
  return new Date(date) > today;
};

export const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); 
  return new Date(d.setDate(diff));
};

export const endOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(),
        diff = d.getDate() + (7 - day); 
  return new Date(d.setDate(diff));
};
