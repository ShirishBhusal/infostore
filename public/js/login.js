function showPassword() {
    const passwordInput = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("show_password");

    if (showPasswordCheckbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 200) {
            window.location.href = '/index'; // Redirect to the home page on successful login
        } else {
            const result = await response.json();
            errorMsg.textContent = result.message;
            errorMsg.style.color = "red";
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred. Please try again.";
        errorMsg.style.color = "red";
    }
});