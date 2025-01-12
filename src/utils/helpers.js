/**
 * Get a user-friendly error message based on Firebase error code
 * @param {object} error - The error object from Firebase
 * @returns {string} - A user-friendly error message
 */
export const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email.'
    case 'auth/wrong-password':
      return 'Incorrect password.'
    case 'auth/invalid-email':
      return 'Invalid email address.'
    case 'auth/email-already-in-use':
      return 'This email is already in use.'
    case 'auth/weak-password':
      return 'Password should be at least 8 characters.'
    case 'auth/account-exists-with-different-credential':
      return 'An account with this email already exists. Please sign in using the original method.'
    default:
      return 'An error occurred. Please try again.'
  }
}
