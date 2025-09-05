// Change DOM property (text content) on button click
const button = document.getElementById('changeTextBtn');
const paragraph = document.getElementById('text');

button.addEventListener('click', () => {
    paragraph.textContent = "The text has been changed!";
});

// Change CSS property (background color) on mouseover
const box = document.getElementById('colorBox');

box.addEventListener('mouseover', () => {
    box.style.backgroundColor = 'lightgreen';
});

box.addEventListener('mouseout', () => {
    box.style.backgroundColor = 'lightblue';
});

