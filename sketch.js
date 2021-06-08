const canvasWidth = 400;
const canvasHeight = 400;
const blockSize = 20;
const text_size = 20;
const font = 'Helvetica';
const win_score = 5;

let snake;
let apple;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
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
    if (eaten(snake, apple)) {
        snake.eat();
        apple.generate();
    };
    update_score(Snake.score)
}

function keyPressed() {
    switch (keyCode) {
        case DOWN_ARROW:
            snake.ySpeed = snake.speed;
            snake.xSpeed = 0;
            break;
        case UP_ARROW:
            snake.ySpeed = -snake.speed;
            snake.xSpeed = 0;
            break;
        case LEFT_ARROW:
            snake.xSpeed = -snake.speed;
            snake.ySpeed = 0;
            break;
        case RIGHT_ARROW:
            snake.xSpeed = snake.speed;
            snake.ySpeed = 0;
            break;
    }
}

function mousePressed() {
    snake.x = canvasWidth / 2;
    snake.y = canvasHeight / 2;
    snake.body = [];
    snake.xSpeed = 0;
    snake.ySpeed = 0;
    Snake.score = 0;
    loop()
}

// snake
class Snake {
    static score = 0;

    constructor() {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.speed = 3;
        this.size = blockSize;
        this.increment = 10 // how many blocks the snake increases after eating
        this.body = [];
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    // draw the snake on the canvas
    draw() {
        fill(0, 255, 0);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
        for (let i in this.body) {
            rect(this.body[i].x, this.body[i].y, this.size, this.size);
        }
    }
    
    // move the snake on the canvas
    move() {
        if (this.body.length > 0) {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }

            this.body[0].x = this.x;
            this.body[0].y = this.y;

        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    checkCollision() {
        // check for collision with the border
        if (this.x + this.size > canvasWidth) {
            this.gameOver();
        } else if (this.x<= 0) {
            this.gameOver();
        } else if (this.y + this.size > canvasHeight) {
            this.gameOver();
        } else if (this.y<= 0) {
            this.gameOver();
        }
        
        /* check for collosion with itself
        since the body blocks are stacked closely together, we only
        check for collision from a blockSize away from the head
        */
        let i = Math.ceil(blockSize / this.speed) * 2;
        while (this.body.length > 0 && i < this.body.length) {
            if (collide({x: this.x, y: this.y}, this.body[i])) {
                this.gameOver();
            }
            i++;
        }
    }

    // gameover alert
    gameOver() {
        
        background(255, 0, 0, 50);
        fill(255);
        textSize(50);
        textFont(font);
        textAlign(CENTER);
        text('Game Over!', canvasWidth / 2, canvasHeight / 2);
        noLoop();
    }

    // append a new body block to the snake after eating
    eat() {
        let x = this.x;
        let y = this.y;
        if (this.body.length > 0) {
            x = this.body[this.body.length - 1].x;
            y = this.body[this.body.length - 1].y;
        }
        for (let i = 0; i < this.increment; i++) {
            if (this.xSpeed != 0) {
                x -= this.xSpeed;
            } else if (this.ySpeed != 0) {
                y -= this.ySpeed;
            }
            this.body.push({'x': x, 'y': y});
        }
        Snake.score++;
        
        if (Snake.score >= win_score) {
            this.win();
        }
    }

    win() {
        background(0, 255, 0, 50);
        fill(255);
        textSize(50);
        textFont(font);
        textAlign(CENTER);
        text('You win', canvasWidth / 2, canvasHeight / 2);
        noLoop();
    }

}

// apple
class Apple {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.size = blockSize;
    }

    // create a new apple in a random location
    generate() {
        this.x = random(canvasWidth);
        this.y = random(canvasHeight);
        while (this.x + this.size > canvasWidth) {
            this.x = random(canvasWidth);
        }
        while (this.y + this.size > canvasHeight) {
            this.y = random(canvasHeight);
        }
    }

    // draw the apple on the canvas
    draw() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
    }
}

// check if position of snake is over the position of apple
function eaten(snake, apple) {
    snakeCenter = {'x': snake.x + snake.size / 2, 
                   'y': snake.y + snake.size / 2};
    appleCenter = {'x': apple.x + apple.size / 2, 
                   'y': apple.y + apple.size / 2};

    // if the snake collides with the apple
    if (Math.abs(snakeCenter.x - appleCenter.x) <= apple.size / 2
        && Math.abs(snakeCenter.y - appleCenter.y) <= apple.size / 2) {
            return true;
        }
    return false;
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