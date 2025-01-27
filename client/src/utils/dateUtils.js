export const VALENTINE_DATES = {
  rose: new Date("2024-02-07"),
  propose: new Date("2024-02-08"),
  chocolate: new Date("2024-02-09"),
  teddy: new Date("2024-02-10"),
  promise: new Date("2024-02-11"),
  hug: new Date("2024-02-12"),
  kiss: new Date("2024-02-13"),
  valentine: new Date("2024-02-14"),
};

export const isDateLocked = (dayType) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = VALENTINE_DATES[dayType];

  if (!targetDate) return true;
  return today < targetDate;
};

export const getAvailableDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Object.entries(VALENTINE_DATES).reduce((acc, [day, date]) => {
    if (today >= date) {
      acc.push(day);
    }
    return acc;
  }, []);
};
