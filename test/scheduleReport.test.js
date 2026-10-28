const { generateScheduleReport } = require("../src/scheduleReport");

const sessions = [
  {
    id: 1,
    classType: "Yoga",
    startsAt: "2026-11-02T18:00:00",
    durationMinutes: 60,
    capacity: 20,
  },
  {
    id: 2,
    classType: "Spin",
    startsAt: "2026-11-02T07:30:00",
    durationMinutes: 45,
    capacity: 12,
  },
  {
    id: 3,
    classType: "HIIT",
    startsAt: "2026-11-03T19:00:00",
    durationMinutes: 30,
    capacity: 15,
  },
  {
    id: 4,
    classType: "Pilates",
    startsAt: "2026-11-04T10:00:00",
    durationMinutes: 50,
    capacity: 10,
  },
  {
    id: 5,
    classType: "Zumba",
    startsAt: "2026-11-05T17:00:00",
    durationMinutes: 45,
    capacity: 2,
  },
];

const bookings = [
  { sessionId: 1, memberId: 101, status: "booked" },
  { sessionId: 1, memberId: 102, status: "attended" },
  { sessionId: 1, memberId: 103, status: "cancelled" },

  { sessionId: 2, memberId: 101, status: "booked" },

  { sessionId: 4, memberId: 104, status: "cancelled" },

  { sessionId: 5, memberId: 105, status: "booked" },
  { sessionId: 5, memberId: 106, status: "attended" },
  { sessionId: 5, memberId: 107, status: "booked" },
];

function check(name, condition) {
  console.log(`${condition ? "PASS" : "FAIL"}: ${name}`);
}

const report = generateScheduleReport(sessions, bookings);

// Test 1: Sessions are sorted by start time
check("Sorts sessions by start time", report[0].classType === "Spin");

// Test 2: Booked and attended bookings count
check("Yoga has 18 spots left", report[1].spotsLeft === 18);

// Test 3: Keeps sessions without bookings
check("HIIT has 15 spots left", report[2].spotsLeft === 15);

// Test 4. Calculates remaining capacity
check("Calculates Spin spots correctly", report[0].spotsLeft === 11);

// Test 5: Cancelled bookings are ignored
check("Pilates has 10 spots left", report[3].spotsLeft === 10);

// Test(Edge) 6: Spots never go below zero (Zumba has more bookings than its capacity)
check("Zumba has 0 spots left", report[4].spotsLeft === 0);

// Test 7: Every session appears in the report
check("Includes all 5 sessions", report.length === 5);

// Test 8: Empty sessions return an empty report
check("Handles empty sessions", generateScheduleReport([], []).length === 0);

// Test(Edge) 9: Booking refers to a session that doesn't exist (Unrelated bookings don't affect valid sessions.)
check(
  "Ignores unrelated bookings",
  generateScheduleReport(
    [
      {
        id: 12,
        classType: "Dance",
        startsAt: "2026-11-06T11:00:00",
        durationMinutes: 30,
        capacity: 10,
      },
    ],
    [{ sessionId: 999, memberId: 1, status: "booked" }],
  )[0].spotsLeft === 10,
);

console.log("\nSchedule Report:");
console.log(report);
