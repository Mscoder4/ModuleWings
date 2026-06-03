(function () {
    // Password Toggle
    var toggleBtn = document.getElementById('togglePassword');
    var passwordInput = document.getElementById('password');
    var iconOn = document.getElementById('eyeIconOn');
    var iconOff = document.getElementById('eyeIconOff');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function () {
            var isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
            toggleBtn.title = isHidden ? 'Hide password' : 'Show password';

            if (iconOn && iconOff) {
                iconOn.style.display = isHidden ? 'none' : 'block';
                iconOff.style.display = isHidden ? 'block' : 'none';
            }
        });
    }

    // Form Submission
    var loginForm = document.getElementById('login-form');
    var submitBtn = document.getElementById('login-submit');

    if (loginForm && submitBtn) {
        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (loginForm.reportValidity()) {
                loginForm.submit();
            }
        });

        // Allow submission on Enter key press in inputs
        loginForm.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (loginForm.reportValidity()) {
                    loginForm.submit();
                }
            }
        });
    }
})();

