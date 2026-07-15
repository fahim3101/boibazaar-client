import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedAuth: Auth | null = null;

// Firebase Auth only ever runs in the browser (it needs popups, cookies,
// window). Initializing it lazily like this — instead of at module load —
// keeps Next.js's server-side rendering and static build completely
// untouched, and avoids crashing the build when env vars aren't set yet.
async function getFirebaseAuth(): Promise<Auth> {
  if (cachedAuth) return cachedAuth;

  const { initializeApp, getApps, getApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");

  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  cachedAuth = getAuth(app);
  return cachedAuth;
}

export async function signInWithGoogle(): Promise<string> {
  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  const auth = await getFirebaseAuth();
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  return result.user.getIdToken();
}

export async function signInWithFacebook(): Promise<string> {
  const { FacebookAuthProvider, signInWithPopup } = await import("firebase/auth");
  const auth = await getFirebaseAuth();
  const result = await signInWithPopup(auth, new FacebookAuthProvider());
  return result.user.getIdToken();
}
