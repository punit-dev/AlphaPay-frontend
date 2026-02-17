/**
 * Separate requests by their current status
 * @param {Array} requests - Array of request objects
 * @returns {Array} Array of objects grouped by status
 */
export const groupRequestsByStatus = (requests) => {
  if (!Array.isArray(requests) || requests.length === 0) {
    return [];
  }

  // Group requests by status field
  const groupedMap = requests.reduce((acc, request) => {
    // Default to 'pending' if no status is found
    const status = (request.status || "pending").toLowerCase();

    if (!acc[status]) {
      acc[status] = [];
    }

    acc[status].push(request);

    return acc;
  }, {});

  // Convert map to array and sort items within each group by date (newest first)
  const groupedArray = Object.entries(groupedMap).map(([status, items]) => ({
    status,
    label: formatRequestStatus(status),
    count: items.length,
    items: items.sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || a.date).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || b.date).getTime();
      return timeB - timeA; // Most recent activity first
    }),
  }));

  // Optional: Sort groups in a specific order (Pending first, then others)
  const statusOrder = ["pending", "approved", "denied"];
  return groupedArray.sort((a, b) => {
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });
};

/**
 * Format request status into a user-friendly label
 * @param {string} status - Raw status string
 * @returns {string} Human-readable label
 */
export const formatRequestStatus = (status) => {
  const labels = {
    pending: "Pending",
    approved: "Approved",
    denied: "Denied",
  };

  return (
    labels[status.toLowerCase()] ||
    status.charAt(0).toUpperCase() + status.slice(1)
  );
};

/**
 * Filter requests by a specific status
 */
export const getRequestsByStatus = (requests, status) => {
  if (!Array.isArray(requests) || !status) return [];

  return requests.filter(
    (req) => req.status?.toLowerCase() === status.toLowerCase(),
  );
};
