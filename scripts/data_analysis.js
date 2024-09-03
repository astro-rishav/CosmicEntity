document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('dataChartCanvas').getContext('2d');
    let dataChart;

    // Function to initialize or update the chart
    function updateChart(data) {
        if (dataChart) {
            dataChart.destroy();
        }
        dataChart = new Chart(ctx, {
            type: 'line', // You can change the type to 'bar', 'pie', etc.
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Astronomical Data',
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Function to handle file upload
    window.uploadData = function() {
        const fileInput = document.getElementById('dataUpload');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = parseCSV(e.target.result);
                updateChart(data);
            };
            reader.readAsText(file);
        }
    };

    // Function to parse CSV data
    function parseCSV(text) {
        const lines = text.split('\n');
        const labels = lines[0].split(',');
        const values = lines.slice(1).map(line => line.split(',')[1]);
        return { labels, values };
    }
});
