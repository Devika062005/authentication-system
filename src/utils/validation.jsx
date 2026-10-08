function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

function validateRegisterForm(formData) {
    const errors = {};

    if (!formData.username) {
        errors.username = "Username is required";
    } else if (
        formData.username.length < 3 ||
        formData.username.length > 20
    ) {
        errors.username = "Username must be 3-20 characters";
    }

    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Enter a valid email";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!formData.fullName) {
        errors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
        errors.fullName = "Full name must be at least 2 characters";
    }

    return errors;
}

function validateLoginForm(formData) {
    const errors = {};

    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Enter a valid email";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    }

    return errors;
}

export {
    validateEmail,
    validateRegisterForm,
    validateLoginForm
};