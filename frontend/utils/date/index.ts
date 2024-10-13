function getDayName(date: Date): string {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[date.getDay()];
}

export function returnCurrentDayName(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Check if today is a weekend (Saturday/Sunday) or Wednesday
  if (dayOfWeek === 0 || dayOfWeek > 3) {
    return "Monday"; // Always return "Monday"
  } else {
    return getDayName(today); // Return the current day's name
  }
}
