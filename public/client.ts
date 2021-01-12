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
  scoreButton.addEventListener("click", () => {
    displayScores();
  });
} else {
  console.log("HTML element not found");
}

const displayScores = () => {
  fetch("/get-scores", { method: "GET" }).then((value) => {
    value
      .json()
      .then((data) => {
        let scores = data["scores"];

        let scoreTable = "<p> sessionID: " + data["sessionID"] + "</p>";

        scoreTable += "<table border='1px solid black'>";
        for (let period in scores) {
          scoreTable += "<tr>";
          scoreTable += "<td>" + scores[period].startTime + "</td>";
          scoreTable += "<td>" + scores[period].endTime + "</td>";
          scoreTable += "<td>" + scores[period].eventCount + "</td>";
          scoreTable += "<td>" + scores[period].score + "</td>";
          scoreTable += "</tr>";
        }
        scoreTable += "</table>";

        const resultsElement = document.getElementById("results");
        if (resultsElement !== null) {
          resultsElement.innerHTML = scoreTable;
        } else {
          console.log("HTML element not found");
        }
      })
      .catch((error) => console.log(error));
  });
};
