document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('dataChartCanvas').getContext('2d');
    let dataChart;

    // Function to initialize or update the chart
    function updateChart(data) {
        if (dataChart) {
            dataChart.destroy();
        }
        dataChart = new Chart(ctx, {
            type: 'scatter', // Change to 'line', 'bar', etc. based on your needs
            data: {
                datasets: [{
                    label: 'Astronomical Data',
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Right Ascension (degrees)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Declination (degrees)'
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        display: true,
                        align: 'top',
                        anchor: 'end',
                        formatter: function(value) {
                            return value.label; // Show star names or other identifiers
                        },
                        color: '#333',
                        font: {
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let label = tooltipItem.raw.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += `RA: ${tooltipItem.raw.x}, Dec: ${tooltipItem.raw.y}, Mag: ${tooltipItem.raw.magnitude}`;
                                return label;
                            }
                        }
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
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
            const values = line.split(',');
            return {
                x: parseFloat(values[headers.indexOf('Right Ascension (degrees)')]),
                y: parseFloat(values[headers.indexOf('Declination (degrees)')]),
                label: values[headers.indexOf('Star Name')],
                magnitude: values[headers.indexOf('Magnitude')]
            };
        });
        return { values: data };
    }
});
