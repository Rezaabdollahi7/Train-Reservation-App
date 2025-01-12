/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if the email is valid, otherwise false
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - The password to validate
 * @returns {boolean} - True if the password is valid, otherwise false
 */
export const validatePassword = (password) => {
  return password.length >= 8
}

/**
 * Check if a field is empty
 * @param {string} value - The value to check
 * @returns {boolean} - True if the field is not empty, otherwise false
 */
export const validateRequired = (value) => {
  return value.trim() !== ''
}
