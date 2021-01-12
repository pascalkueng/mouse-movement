// Throttle function
const throttled = (delay: number, fn: (...args: any) => any) => {
  let lastCall = 0;
  return (...args: any) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

// Send mouse move event to server
const sendMouseMovement = () => fetch("/log-movement", { method: "POST" });
const sendMouseMovementThrottled = throttled(10000 * 0.1, sendMouseMovement);

// Add mouse move listener to body element
const bodyElement = document.getElementById("body");
if (bodyElement !== null) {
  bodyElement.addEventListener("mousemove", sendMouseMovementThrottled);
} else {
  console.log("HTML element not found");
}

// Add click listener to score button
const scoreButton = document.getElementById("scores");
if (scoreButton !== null) {
  scoreButton.addEventListener("click", () =>
    fetch("/log-scores", { method: "POST" })
  );
} else {
  console.log("HTML element not found");
}
