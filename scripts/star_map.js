document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starMapCanvas');
    const ctx = canvas.getContext('2d');
    const starInfo = document.getElementById('starInfo');
    let stars = [];
    let scale = 1; // Scale factor for zoom
    let offsetX = 0; // Pan offset X
    let offsetY = 0; // Pan offset Y
    let isDragging = false;
    let startDragX, startDragY;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }

    function drawStars() {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#fff';

        stars.forEach(star => {
            const x = (star.rightAscension / 24) * canvasWidth * scale + offsetX;
            const y = (1 - (star.declination + 90) / 180) * canvasHeight * scale + offsetY;
            ctx.beginPath();
            ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = `12px Arial`;
            ctx.fillText(star.name, x + 5 * scale, y - 5 * scale);
        });
    }

    // Load and draw stars
    fetch('assets/data/star_data.json')
        .then(response => response.json())
        .then(data => {
            stars = data.stars;
            drawStars();
        });

    // Show star info on hover
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let starFound = false;
        stars.forEach(star => {
            const x = (star.rightAscension / 24) * canvas.width * scale + offsetX;
            const y = (1 - (star.declination + 90) / 180) * canvas.height * scale + offsetY;
            if (Math.hypot(mouseX - x, mouseY - y) < 10 * scale) {
                starInfo.style.display = 'block';
                starInfo.style.left = `${e.clientX + 10}px`;
                starInfo.style.top = `${e.clientY + 10}px`;
                starInfo.innerHTML = `
                    <strong>${star.name}</strong><br>
                    RA: ${star.rightAscension}<br>
                    Dec: ${star.declination}<br>
                    Mag: ${star.magnitude}<br>
                    Spectral Type: ${star.spectralType}
                `;
                starFound = true;
            }
        });
        if (!starFound) {
            starInfo.style.display = 'none';
        }
    });

    // Zoom functionality
    canvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        scale = e.deltaY < 0 ? scale * 1.1 : scale / 1.1;
        drawStars();
    });

    // Pan functionality
    canvas.addEventListener('mousedown', function(e) {
        isDragging = true;
        startDragX = e.clientX - offsetX;
        startDragY = e.clientY - offsetY;
    });

    canvas.addEventListener('mousemove', function(e) {
        if (isDragging) {
            offsetX = e.clientX - startDragX;
            offsetY = e.clientY - startDragY;
            drawStars();
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', function() {
        isDragging = false;
    });

    // Initial draw
    resizeCanvas();
    drawStars();

    // Resize event
    window.addEventListener('resize', resizeCanvas);
});
