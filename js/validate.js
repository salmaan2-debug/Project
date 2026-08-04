// Contact form validation script. Handles inline errors, email validation, and success display.
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    // Create or return the inline error element directly below the field.
    function getErrorElement(fieldId) {
        const field = document.getElementById(fieldId);
        let errorElement = field.nextElementSibling;

        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.display = 'none';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }

        return errorElement;
    }

    function showError(fieldId, message) {
        const errorElement = getErrorElement(fieldId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Hide the inline error message for a field.
    function clearError(fieldId) {
        const errorElement = getErrorElement(fieldId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        clearError('name');
        clearError('email');
        clearError('message');

        // Validate fields
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }

        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } 
        else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        }

        else if (message.length < 20) {
            showError('message', 'Message must be at least 20 characters long');
            isValid = false;
        }

        // If all validations pass, replace the form with a visible success message.
        if (isValid) {

        form.innerHTML = `
            <div class="success-message">
                <h3>Thank you, ${name}!</h3>
                <p>Your message has been successfully sent. We will get back to you shortly.</p>
            </div> `;
        }
    });

    // Clear the error message when the user updates a field.
    ['name', 'email', 'message'].forEach(function (fieldId) {
        const field = document.getElementById(fieldId);
        document.getElementById(fieldId).addEventListener('input', function() {
            clearError(fieldId);
        });
    });

});