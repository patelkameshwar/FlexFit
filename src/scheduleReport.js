function generateScheduleReport(sessions, bookings) {
  const bookingCounts = new Map();

  for (const booking of bookings) {
    if (["booked", "attended"].includes(booking.status)) {
      bookingCounts.set(
        booking.sessionId,
        (bookingCounts.get(booking.sessionId) || 0) + 1,
      );
    }
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}`;

  return sessions
    .map((session) => {
      const start = new Date(session.startsAt);
      const end = new Date(start.getTime() + session.durationMinutes * 60000);

      const occupied = bookingCounts.get(session.id) || 0;

      return {
        day: `${weekdays[start.getDay()]} ${start.getDate()} ${
          months[start.getMonth()]
        }`,
        timeRange: `${formatTime(start)}–${formatTime(end)}`,
        classType: session.classType,
        spotsLeft: Math.max(0, session.capacity - occupied),
        startTime: start.getTime(),
      };
    })
    .sort((a, b) => a.startTime - b.startTime)
    .map(({ startTime, ...session }) => session);
}

module.exports = { generateScheduleReport };
