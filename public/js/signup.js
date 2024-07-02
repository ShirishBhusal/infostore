// Function to validate that password and confirm password match
function validatePassword() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const errorMsg = document.getElementById("error-msg");

    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMsg.textContent = "Password and Confirm Password do not match";
        errorMsg.style.display = "block"; // Ensure error message is displayed
        return false;
    } else {
        errorMsg.textContent = ""; // Clear error message if passwords match
        errorMsg.style.display = "none"; // Hide error message
        return true;
    }
}

// Function to show popup message
function showMessage(message) {
    const messageBox = document.getElementById("messageBox");
    const messageText = document.getElementById("messageText");

    messageText.textContent = message;
    messageBox.style.display = "flex"; // Show message box
}

// Function to redirect to login page
function redirectToLogin() {
    window.location.href = '/'; // Redirect to login page
}

// Event listener to handle form submission
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate password match
    if (!validatePassword()) {
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, password })
        });

        if (response.status === 201) {
            showMessage("Account created successfully."); // Show success message
        } else {
            const result = await response.json();
            const errorMsg = document.getElementById('error-msg');
            errorMsg.textContent = result.message;
            errorMsg.style.color = "red";
        }
    } catch (error) {
        const errorMsg = document.getElementById('error-msg');
        errorMsg.textContent = "An error occurred. Please try again.";
        errorMsg.style.color = "red";
    }
});

// Toggle password visibility
document.getElementById("password-toggle").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("password-toggle");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈"; // Change icon to indicate visibility
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️"; // Change icon to indicate hidden
    }
});

document.getElementById("confirm-password-toggle").addEventListener("click", function () {
    const confirmPasswordInput = document.getElementById("confirm_password");
    const toggleIcon = document.getElementById("confirm-password-toggle");

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleIcon.textContent = "🙈"; // Change icon to indicate visibility
    } else {
        confirmPasswordInput.type = "password";
        toggleIcon.textContent = "👁️"; // Change icon to indicate hidden
    }
});

