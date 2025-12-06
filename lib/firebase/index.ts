// Export all Firebase modules for easy importing
export { auth, db, googleProvider } from './config';
export {
    signupWithEmailPassword,
    loginWithEmailPassword,
    loginWithGoogle,
    logout,
    type SignupResult
} from './auth';
export {
    createOrUpdateUserDocument,
    type UserData
} from './firestore';
