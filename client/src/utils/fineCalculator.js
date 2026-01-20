export const calculateFine = (dateTaken, dateReturned = null) => {
  if (!dateTaken) return 0;

  const currentDate = dateReturned ? new Date(dateReturned) : new Date();
  const takeDate = new Date(dateTaken);

  // Calculate days difference
  const timeDiff = currentDate - takeDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Fine calculation logic
  if (daysDiff <= 10) {
    return 0;
  } else if (daysDiff === 11) {
    return 1;
  } else if (daysDiff === 12) {
    return 2;
  } else if (daysDiff === 13) {
    return 4;
  } else if (daysDiff === 14) {
    return 8;
  } else {
    // For 15+ days, double the fine from day 14 for each additional day
    let fine = 8;
    for (let i = 15; i <= daysDiff; i++) {
      fine *= 2;
    }
    return fine;
  }
};

// Format fine for display
export const formatFine = (fine) => {
  return `₹${fine}`;
};

// Get days overdue
export const getDaysOverdue = (dateTaken, dateReturned = null) => {
  if (!dateTaken) return 0;

  const currentDate = dateReturned ? new Date(dateReturned) : new Date();
  const takeDate = new Date(dateTaken);

  const timeDiff = currentDate - takeDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff > 10 ? daysDiff - 10 : 0;
};