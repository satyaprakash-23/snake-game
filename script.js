const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

function draw() {
    // Draw the snake
    ctx.fillStyle = "#00f";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });

    // Draw the food
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function update() {
    // Update the snake position
    const head = { ...snake[0] };
    switch (direction) {
        case "up": head.y--; break;
        case "down": head.y++; break;
        case "left": head.x--; break;
        case "right": head.x++; break;
    }

    // Check for collisions with the walls
    if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize) {
        gameOver();
        return;
    }

    // Check for collisions with the food
    if (head.x === food.x && head.y === food.y) {
        snake.unshift({ ...food });
        generateFood();
    } else {
        // Move the snake
        snake.unshift(head);
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
}

function gameOver() {
    alert("Game Over!");
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    generateFood();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    setTimeout(gameLoop, 200); // Adjust the speed (lower values make the game faster)
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": direction = "up"; break;
        case "ArrowDown": direction = "down"; break;
        case "ArrowLeft": direction = "left"; break;
        case "ArrowRight": direction = "right"; break;
    }
});

generateFood();
gameLoop();

