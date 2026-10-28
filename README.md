# FlexFit Schedule Report

## How to Run

Requirements: Node.js installed.

From the project root, run:

```bash
node test/scheduleReport.test.js
```

The tests print `PASS` or `FAIL` for each case, followed by the generated schedule report.

## Output Shape

The function `generateScheduleReport(sessions, bookings)` returns an array of session objects sorted by start time.

Each object contains:

- `classType`: Name of the class.
- `day`: Abbreviated weekday, day of the month, and abbreviated month (e.g., `Mon 2 Nov`).
- `timeRange`: Start and end times in 24-hour format (e.g., `18:00–19:00`).
- `spotsLeft`: Remaining spots, never below zero.

## Assumptions

- Each booking represents one spot.
- Only `booked` and `attended` bookings count toward occupancy; `cancelled` bookings are ignored.
- Sessions without bookings are included in the report.
- Bookings referencing unknown session IDs are ignored.
- If bookings exceed capacity, `spotsLeft` is reported as `0`; the function does not prevent overbooking.
- Input sessions and bookings have valid fields and dates.
- Dates and times use the runtime's local timezone.
