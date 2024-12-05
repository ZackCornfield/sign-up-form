document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Utility function to show error message
    const showError = (input, message) => {
        const formGroup = input.closest(".form-group");
        const errorMessage = formGroup.querySelector(".error-message");
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
        input.classList.add("input-error");
    };

    // Utility function to hide error message
    const hideError = (input) => {
        const formGroup = input.closest(".form-group");
        const errorMessage = formGroup.querySelector(".error-message");
        errorMessage.style.display = "none";
        input.classList.remove("input-error");
    };

    // Validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate the form fields
    const validateField = (input) => {
        const value = input.value.trim();

        if (input === firstName && value === "") {
            showError(input, "First Name is required");
            return false;
        }

        if (input === lastName && value === "") {
            showError(input, "Last Name is required");
            return false;
        }

        if (input === email) {
            if (value === "") {
                showError(input, "Email is required");
                return false;
            } else if (!isValidEmail(value)) {
                showError(input, "Email is invalid");
                return false;
            }
        }

        if (input === password && value === "") {
            showError(input, "Password is required");
            return false;
        }

        if (input === confirmPassword) {
            if (value === "") {
                showError(input, "Confirm Password is required");
                return false;
            } else if (value !== password.value.trim()) {
                showError(input, "Passwords do not match");
                return false;
            }
        }

        hideError(input);
        return true;
    };

    // Add event listeners to inputs for real-time validation
    [firstName, lastName, email, password, confirmPassword].forEach((input) => {
        input.addEventListener("input", () => validateField(input));
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let isFormValid = true;

        // Validate all fields
        [firstName, lastName, email, password, confirmPassword].forEach((input) => {
            const isValid = validateField(input);
            if (!isValid) isFormValid = false;
        });

        if (isFormValid) {
            // Form is valid; proceed with form submission or other logic
            alert("Form submitted successfully!");
            form.reset();
        }
    });
});
