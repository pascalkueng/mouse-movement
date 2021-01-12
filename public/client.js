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
        return fetch("/log-scores", { method: "POST" });
    });
}
else {
    console.log("HTML element not found");
}
