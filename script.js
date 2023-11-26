const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let a = 10; // Start with a circular pattern
let b = 10;
let A = canvas.width / 3; 
let B = canvas.height / 3; 
let delta = Math.PI / 2; 
let maxPoints = 1; // Start with one point
let pointIncrement = 0.1; // Slow increment initially

let animationFrameId;
let isPaused = true;

function drawLissajousCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    for (let i = 0; i < maxPoints; i++) {
        const step = i * 0.01;
        const x = A * Math.sin(a * step + delta) + canvas.width / 2;
        const y = B * Math.sin(b * step) + canvas.height / 2;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "whitesmoke";
    ctx.stroke();
}

function update() {
    if (!isPaused) {
        maxPoints += pointIncrement;
        if (maxPoints > 1000) maxPoints = 1000; // Cap the number of points
        if (maxPoints > 500) pointIncrement = 1; // Speed up drawing after initial phase

        b += 0.005; // Gradually change the shape

        drawLissajousCurve();
        updateLissajousDisplay();
    }
    animationFrameId = requestAnimationFrame(update);
}


function updateLissajousDisplay() {
    const paramsText = `A = ${A.toFixed(2)}, B = ${B.toFixed(
        2
    )}, a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, δ = ${delta.toFixed(2)}`;
    document.getElementById("lissajousParams").textContent = paramsText;
}

document.getElementById("startButton").addEventListener("click", function () {
    if (isPaused) {
        isPaused = false;
        animationFrameId = requestAnimationFrame(update);
    }
});

document.getElementById("pauseButton").addEventListener("click", function () {
    isPaused = !isPaused;
    if (isPaused) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    } else {
        animationFrameId = requestAnimationFrame(update);
    }
});

document.getElementById("resetButton").addEventListener("click", function () {
    isPaused = true;
    maxPoints = 1;
    a = 5;
    b = 5; // Reset to circle shape
    delta = Math.PI / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateLissajousDisplay();
});

// Initially pause the animation
isPaused = true;
