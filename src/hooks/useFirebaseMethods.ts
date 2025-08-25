"use client";

// Firebase
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import app from "@/libs/firebase/firebase.config";

// Create auth & Google provider instances
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

const useFirebaseMethods = () => {
  // login with Google
  const loginGoogle = (): Promise<UserCredential> => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  return {
    loginGoogle,
  };
};

export default useFirebaseMethods;
