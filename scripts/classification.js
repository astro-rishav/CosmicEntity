document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');
    const resultElement = document.getElementById('classification');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let formData = new FormData();
        let imageFile = document.getElementById('imageInput').files[0];

        if (imageFile) {
            formData.append('image', imageFile);

            fetch('/classify', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    resultElement.textContent = `Error: ${data.error}`;
                } else {
                    resultElement.textContent = `The celestial object is classified as: ${data.classification}`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultElement.textContent = 'An error occurred. Please try again.';
            });
        } else {
            resultElement.textContent = 'Please upload an image.';
        }
    });
});
