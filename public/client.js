// Throttle function
var throttled = function (delay, fn) {
    var lastCall = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn.apply(void 0, args);
    };
};
// Send mouse move event to server
var sendMouseMovement = function () { return fetch("/log-movement", { method: "POST" }); };
var sendMouseMovementThrottled = throttled(10000 * 0.1, sendMouseMovement);
// Add mouse move listener to body element
var bodyElement = document.getElementById("body");
if (bodyElement !== null) {
    bodyElement.addEventListener("mousemove", sendMouseMovementThrottled);
}
else {
    console.log("HTML element not found");
}
// Add click listener to score button
var scoreButton = document.getElementById("scores");
if (scoreButton !== null) {
    scoreButton.addEventListener("click", function () {
        displayScores();
    });
}
else {
    console.log("HTML element not found");
}
// Get scores from the server and display them in a table
var displayScores = function () {
    fetch("/get-scores", { method: "GET" }).then(function (value) {
        value
            .json()
            .then(function (data) {
            var scores = data["scores"];
            var scoreTable = "<p> sessionID: " + data["sessionID"] + "</p>";
            scoreTable += "<table border='1px solid black'>";
            for (var period in scores) {
                scoreTable += "<tr>";
                scoreTable += "<td>" + scores[period].startTime + "</td>";
                scoreTable += "<td>" + scores[period].endTime + "</td>";
                scoreTable += "<td>" + scores[period].eventCount + "</td>";
                scoreTable += "<td>" + scores[period].score + "</td>";
                scoreTable += "</tr>";
            }
            scoreTable += "</table>";
            var resultsElement = document.getElementById("results");
            if (resultsElement !== null) {
                resultsElement.innerHTML = scoreTable;
            }
            else {
                console.log("HTML element not found");
            }
        })["catch"](function (error) { return console.log(error); });
    });
};
