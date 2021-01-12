import { scoredTimePeriod } from "./types";

// Period fraction for demo purposed
export const demoFraction = 0.1;

// Duration per time period in miliseconds (5 minutes)
const timePeriod = 300000 * demoFraction;

// Set number of events per category
const heavyInteraction = Math.round((timePeriod / 1000) * 0.8);
const regularInteraction = Math.round((timePeriod / 1000) * 0.5);
const minimalInteraction = Math.round((timePeriod / 1000) * 0.1);

// Store mouse move events here
let events = new Map<string, number[]>();

// Handle mouse move event
export const handleEvent = (sessionID: string, timeStamp: number) => {
  console.log("Received move event from client");

  let current = events.get(sessionID);

  // Add timestampt to specified sessionID
  if (current === undefined) {
    events.set(sessionID, [timeStamp]);
  } else {
    current.push(timeStamp);
    events.set(sessionID, current);
  }
};

// Divides move events into time periods
// based on start time and scores them
export const getTimePeriods = (sessionID: string, startTime: number) => {
  const sessionEvents = events.get(sessionID) || [];

  const currentTime = new Date().getTime();

  let scoredTimePeriods: scoredTimePeriod[] = [];

  let eventIterator = 0;
  for (
    let currentPeriod = startTime;
    currentPeriod < currentTime;
    currentPeriod += timePeriod
  ) {
    let currentEventCount = 0;
    while (sessionEvents[eventIterator] - currentPeriod <= timePeriod) {
      currentEventCount++;
      eventIterator++;
    }

    scoredTimePeriods.push({
      startTime: new Date(currentPeriod),
      endTime: new Date(currentPeriod + timePeriod),
      eventCount: currentEventCount,
      score: calculateScore(currentEventCount),
    });
  }

  return scoredTimePeriods;
};

// Calculate score based on number of events
export const calculateScore = (movements: number) => {
  if (movements >= heavyInteraction) {
    return "heavy interaction";
  } else if (movements >= regularInteraction) {
    return "regular interaction";
  } else if (movements >= minimalInteraction) {
    return "minimal interaction";
  } else {
    return "no interaction";
  }
};
