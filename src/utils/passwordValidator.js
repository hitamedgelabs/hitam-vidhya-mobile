// utils/passwordValidator.js

export const validatePassword = (password, confirmPassword) => {
  const errors = [];

  if (!password || !confirmPassword) {
    return {
      valid: false,
      errors: "*Password and Confirm Password are required"
    };
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  if (password.includes(" ")) {
    errors.push("Password must not contain spaces");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    valid: errors.length === 0,
    errors: errors.join("\n")
  };
};
