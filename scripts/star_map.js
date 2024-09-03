document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starMapCanvas');
    const ctx = canvas.getContext('2d');

    function draw() {
        // Your drawing code here
    }

    function update() {
        // Your update code here
        draw();
        requestAnimationFrame(update);
    }

    update();
});
