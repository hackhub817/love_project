export const VALENTINE_DATES = {
  rose: "2024-02-07",
  propose: "2024-02-08",
  chocolate: "2024-02-09",
  teddy: "2024-02-10",
  promise: "2024-02-11",
  hug: "2024-02-12",
  kiss: "2024-02-13",
  valentine: "2024-02-14",
};

export const isDateLocked = (dayType) => {
  if (!dayType || !VALENTINE_DATES[dayType]) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unlockDate = new Date(VALENTINE_DATES[dayType]);
  unlockDate.setHours(0, 0, 0, 0);

  return today < unlockDate;
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
