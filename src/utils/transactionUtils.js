/**
 * Separate transactions by date
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of objects with date and corresponding transactions
 */
export const groupTransactionsByDate = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  // Group transactions by date
  const groupedMap = transactions.reduce((acc, transaction) => {
    // Extract date from transaction timestamp/date field
    const transactionDate =
      transaction.createdAt || transaction.date || transaction.timestamp;

    if (!transactionDate) {
      return acc;
    }

    // Convert to Date object and get date in YYYY-MM-DD format
    const date = new Date(transactionDate);
    const dateKey = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Initialize array for this date if it doesn't exist
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(transaction);

    return acc;
  }, {});

  // Convert map to array and sort by date (newest first)
  const groupedArray = Object.entries(groupedMap)
    .map(([date, transactions]) => ({
      date,
      formattedDate: formatDate(date),
      items: transactions.sort((a, b) => {
        const timeA = new Date(a.createdAt || a.date || a.timestamp).getTime();
        const timeB = new Date(b.createdAt || b.date || b.timestamp).getTime();
        return timeB - timeA; // Sort by newest first
      }),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort date groups by newest first

  return groupedArray;
};

/**
 * Format date string to readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString + "T00:00:00");
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if date is today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Check if date is yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Format as "Jan 15, 2026"
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get transactions for a specific date
 * @param {Array} transactions - Array of transaction objects
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Array} Transactions for the specified date
 */
export const getTransactionsByDate = (transactions, dateString) => {
  if (!Array.isArray(transactions) || !dateString) {
    return [];
  }

  return transactions.filter((transaction) => {
    const transactionDate =
      transaction.createdAt || transaction.date || transaction.timestamp;
    if (!transactionDate) return false;

    const date = new Date(transactionDate);
    const dateKey = date.toISOString().split("T")[0];
    return dateKey === dateString;
  });
};

/**
 * Separate transactions by date range
 * @param {Array} transactions - Array of transaction objects
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Array} Transactions within the date range
 */
export const getTransactionsByDateRange = (
  transactions,
  startDate,
  endDate,
) => {
  if (!Array.isArray(transactions) || !startDate || !endDate) {
    return [];
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1); // Include end date

  return transactions.filter((transaction) => {
    const transactionDate =
      transaction.createdAt || transaction.date || transaction.timestamp;
    if (!transactionDate) return false;

    const date = new Date(transactionDate);
    return date >= start && date < end;
  });
};
