// update the win_score
const win_text = document.querySelector('#win-score-text')
win_text.innerText = win_score;

const win_slider = document.querySelector('#win-score');
const size_slider = document.querySelector('#block-size');
const speed_slider = document.querySelector('#snake-speed');

const win_label = document.querySelector('label[for="win-score"]');
const size_label = document.querySelector('label[for="block-size"]');
const speed_label = document.querySelector('label[for="snake-speed"]');

win_label.innerText = `Winning Score (${win_slider.value}):`;
size_label.innerText = `Block Size (${size_slider.value}):`;
speed_label.innerText = `Snake Speed (${speed_slider.value}):`;

win_slider.oninput = () => {
    win_label.innerText = `Winning Score (${win_slider.value}):`;
    win_score = parseInt(win_slider.value);
    win_text.innerText = win_score;
}
size_slider.oninput = () => {
    size_label.innerText = `Block Size (${size_slider.value}):`;
    snake = new Snake();
    apple = new Apple();
    blockSize = parseInt(size_slider.value)
    snake = new Snake();
    apple = new Apple();
}
speed_slider.oninput = () => {
    speed_label.innerText = `Snake Speed (${speed_slider.value}):`;
    snake.speed = parseInt(speed_slider.value);
}