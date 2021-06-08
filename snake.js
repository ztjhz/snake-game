// snake
class Snake {
    constructor() {
        this.score = 0;
        this.x = Math.floor((cols / 2) * blockSize);
        this.y = Math.floor((rows / 2) * blockSize);
        this.speed = 2;
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

    changeDir(xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    checkCollision() {
        // check for collision with the border
        if (this.x + this.size > canvasWidth) {
            lose();
        } else if (this.x<= 0) {
            lose();
        } else if (this.y + this.size > canvasHeight) {
            lose();
        } else if (this.y<= 0) {
            lose();
        }
        
        /* check for collosion with itself
        since the body blocks are stacked closely together, we only
        check for collision from a blockSize away from the head
        */
        let i = Math.ceil(blockSize / this.speed) * 2;
        while (this.body.length > 0 && i < this.body.length) {
            if (collide({x: this.x, y: this.y}, this.body[i])) {
                lose();
            }
            i++;
        }
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
        this.score++;
    }
}
