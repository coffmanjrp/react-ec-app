import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
