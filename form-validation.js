document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.main-contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Function to display an error message
    function displayError(element, message) {
        element.textContent = message;
        element.style.display = 'block'; // Make the error message visible
        element.style.color = '#ff6b6b'; // A vibrant red for errors
        element.style.fontSize = '0.9em';
        element.style.marginTop = '5px';
    }

    // Function to clear an error message
    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none'; // Hide the error message
    }

    // --- Validation Functions ---

    function validateName() {
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            displayError(nameError, 'Name is required.');
            return false;
        } else if (nameValue.length < 2) {
            displayError(nameError, 'Name must be at least 2 characters long.');
            return false;
        } else {
            clearError(nameError);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

        if (emailValue === '') {
            displayError(emailError, 'Email is required.');
            return false;
        } else if (!emailPattern.test(emailValue)) {
            displayError(emailError, 'Please enter a valid email address.');
            return false;
        } else {
            clearError(emailError);
            return true;
        }
    }

    function validateMessage() {
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            displayError(messageError, 'Message is required.');
            return false;
        } else if (messageValue.length < 10) {
            displayError(messageError, 'Message must be at least 10 characters long.');
            return false;
        } else {
            clearError(messageError);
            return true;
        }
    }

    // --- Event Listeners for Real-time Validation (on blur/input) ---

    nameInput.addEventListener('blur', validateName); // Validate when user leaves the field
    nameInput.addEventListener('input', () => { // Clear error as user types after an error
        if (nameError.textContent !== '') validateName();
    });

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
        if (emailError.textContent !== '') validateEmail();
    });

    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
        if (messageError.textContent !== '') validateMessage();
    });


    // --- Form Submission Validation ---

    form.addEventListener('submit', function(event) {
        // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If any validation fails, prevent form submission
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            event.preventDefault(); // Stop the form from submitting
            // Optionally, scroll to the first error or give a general message
            console.log("Form has validation errors. Not submitting.");
        } else {
            // If all fields are valid, you can optionally perform an AJAX submission here
            // or let the form submit traditionally (if action="" points to a backend script)
            console.log("Form is valid! (Form submission prevented for demonstration)");
            event.preventDefault(); // Prevent default submission for now, as there's no backend
            alert('Form submitted successfully! (This is client-side only. No email sent yet.)');
            form.reset(); // Clear the form after successful "submission"
            // In a real application, you'd send data to a server here using fetch() or XMLHttpRequest
        }
    });
});