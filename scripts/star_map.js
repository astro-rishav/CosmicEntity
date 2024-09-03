document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starMapCanvas');
    const ctx = canvas.getContext('2d');

    // Function to load star data from JSON
    async function loadStarData() {
        try {
            const response = await fetch('assets/data/star_data.json');
            const data = await response.json();
            return data.stars;
        } catch (error) {
            console.error('Error loading star data:', error);
        }
    }

    // Function to draw stars on the canvas
    function drawStars(stars) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            const { name, magnitude } = star;
            // Map magnitude to size
            const size = 5 - (parseFloat(magnitude) + 5); // Simple magnitude to size conversion
            const color = `rgba(255, 255, 255, ${1 - (size / 5)})`; // Adjust opacity based on magnitude

            // Draw star (using a simple circle for now)
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();

            // Draw star name
            ctx.font = '12px Arial';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(name, Math.random() * canvas.width, Math.random() * canvas.height);
        });
    }

    // Main function to initialize the star map
    async function init() {
        const stars = await loadStarData();
        if (stars) {
            drawStars(stars);
        }
    }

    init();
});
