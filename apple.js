// apple
class Apple {
    constructor() {
        this.x;
        this.y;
        this.size = blockSize;
        this.generate();
    }

    // create a new apple in a random location
    generate() {
        this.x = random(cols) * blockSize;
        this.y = random(rows) * blockSize;
        while (this.x + this.size > canvasWidth) {
            this.x = random(cols) * blockSize;
        }
        while (this.y + this.size > canvasHeight) {
            this.y = random(rows) * blockSize;
        }
        if (collide (snake, this)) {
            this.generate();
        }
    }

    // draw the apple on the canvas
    draw() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
    }
}