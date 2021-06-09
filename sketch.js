const canvasWidth = 400;
const canvasHeight = 400;
let blockSize = 20;
let rows = canvasHeight / blockSize;
let cols = canvasWidth / blockSize;
const text_size = 20;
const font = 'Helvetica';
let win_score = 5;

let snake;
let apple;

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('game-container');
    background(51);
    snake = new Snake();
    apple = new Apple();
}

function draw() {
    background(51);
    apple.draw();
    snake.draw();
    snake.move();
    snake.checkCollision();
    if (collide(snake, apple)) {
        snake.eat();
        apple.generate();
    };
    if (snake.score >= win_score) {
        win();
    }
    update_score(snake.score)
}

function keyPressed() {
    switch (keyCode) {
        case DOWN_ARROW:
            snake.changeDir(0, snake.speed);
            break;
        case UP_ARROW:
            snake.changeDir(0, -snake.speed);
            break;
        case LEFT_ARROW:
            snake.changeDir(-snake.speed, 0);
            break;
        case RIGHT_ARROW:
            snake.changeDir(snake.speed, 0);
            break;
    }
}

function mousePressed() {
    if (!isLooping()) {
        snake = new Snake();
        snake.speed = parseInt(document.querySelector('#snake-speed').value);
        loop();
    }
}


// check if collision of 2 blocks
function collide(i, j) {
    // ensure there is no gap between any of the 4 sides of the rect
    if (i['x'] < j['x'] + blockSize &&
        i['x'] + blockSize > j['x'] &&
        i['y'] < j['y'] + blockSize &&
        i['y'] + blockSize > j['y']) {
            return true;
        }
    return false;
}

function update_score(score) {
    textSize(text_size);
    textFont(font);
    textAlign(CENTER);
    fill(255);
    text(`score: ${score} / ${win_score}`, canvasWidth - 100, 30);
}

// win alert
function win() {
    background(0, 255, 0, 50);
    fill(255);
    textSize(25);
    textFont(font);
    textAlign(CENTER);
    text('You win! (click to play again)', canvasWidth / 2, canvasHeight / 2);
    noLoop();
}

// lose alert
function lose() {
    background(255, 0, 0, 50);
    fill(255);
    textSize(25);
    textFont(font);
    textAlign(CENTER);
    text('Game Over! (click to play again)', canvasWidth / 2, canvasHeight / 2);
    noLoop();
}