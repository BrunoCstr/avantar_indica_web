import { createContext } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

interface UserData {
  displayName: string;
  email: string;
  affiliated_to: string;
  uid: string;
  profilePicture: string;
  phone: string;
  role: string;
}

const AuthContext = createContext({})

const AuthProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export async function SignIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;

  } catch (err: any) {
    console.error(err)
    return err.code
  }
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}
