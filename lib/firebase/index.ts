// Export all Firebase modules for easy importing
export { auth, db, googleProvider } from './config';
export {
    signupWithEmailPassword,
    loginWithEmailPassword,
    loginWithGoogle,
    logout,
    resetPassword,
    type SignupResult
} from './auth';
export {
    createOrUpdateUserDocument,
    type UserData
} from './firestore';
export {
    getFriendlyErrorMessage,
    logAndGetFriendlyError,
    isAuthError,
    isFirestoreError
} from './errors';
