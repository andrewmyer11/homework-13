let obstacles = [];   // Array to store obstacles
let newObstacles = [];  // Non-moving obstacles added by mouse clicks
let playerX, playerY;  // Player position
let exitX, exitY, exitW, exitH;  // Exit properties
let gameWon = false;

function setup() {
    createCanvas(800, 600);

    // Create 5 initial obstacles
    for (let i = 0; i < 5; i++) {
        obstacles.push({
            x: random(width),
            y: random(height),
            w: random(30, 80),
            h: random(30, 80),
            color: [random(255), random(255), random(255)],
            speedX: random(-3, 3),
            speedY: random(-3, 3)
        });
    }

    // Initialize player at the center
    playerX = width / 2;
    playerY = height / 2;

    // Define the exit area
    exitX = width - 100;
    exitY = height - 80;
    exitW = 80;
    exitH = 60;
}

function draw() {
    background(0);  // Clear the screen

    // Draw exit
    fill(0, 255, 0);
    rect(exitX, exitY, exitW, exitH);
    textSize(16);
    fill(0);
    textAlign(CENTER, CENTER);
    text("EXIT", exitX + exitW / 2, exitY + exitH / 2);

    // Draw obstacles
    for (let obs of obstacles) {
        fill(obs.color);
        rect(obs.x, obs.y, obs.w, obs.h);

        // Move obstacles
        obs.x += obs.speedX;
        obs.y += obs.speedY;

        // Wrap around screen
        if (obs.x > width) obs.x = -obs.w;
        if (obs.x + obs.w < 0) obs.x = width;
        if (obs.y > height) obs.y = -obs.h;
        if (obs.y + obs.h < 0) obs.y = height;
    }

    // Draw non-moving obstacles
    for (let obs of newObstacles) {
        fill(obs.color);
        rect(obs.x, obs.y, obs.w, obs.h);
    }

    // Draw player
    if (!gameWon) {
        fill(255, 255, 0);
        ellipse(playerX, playerY, 30, 30);

        // Move player with arrow keys
        if (keyIsDown(LEFT_ARROW)) playerX -= 5;
        if (keyIsDown(RIGHT_ARROW)) playerX += 5;
        if (keyIsDown(UP_ARROW)) playerY -= 5;
        if (keyIsDown(DOWN_ARROW)) playerY += 5;

        // Check if player reached the exit
        if (
            playerX > exitX && 
            playerX < exitX + exitW && 
            playerY > exitY && 
            playerY < exitY + exitH
        ) {
            gameWon = true;
        }
    }

    // Display winning message
    if (gameWon) {
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("YOU WIN!", width / 2, height / 2);
    }
}

function mousePressed() {
    // Add a non-moving obstacle at the mouse position
    newObstacles.push({
        x: mouseX,
        y: mouseY,
        w: random(30, 80),
        h: random(30, 80),
        color: [random(255), random(255), random(255)]
    });
}