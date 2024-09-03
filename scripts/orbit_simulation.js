document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('orbitCanvas');
    const ctx = canvas.getContext('2d');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');

    speedRange.addEventListener('input', function() {
        speedValue.textContent = `${speedRange.value}x`;
        // Update simulation speed based on range value
    });

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
