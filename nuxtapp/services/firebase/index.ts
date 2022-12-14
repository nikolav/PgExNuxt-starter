// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import config from "./config";

// Initialize Firebase
const app = 0 < getApps().length ? getApp() : initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const auth = getAuth(app);
const storage = getStorage(app);
const dbRealtime = getDatabase(app);

const client = {
  app,
  config,
  dbRealtime,
  db,
  // auth,
  storage,
};

export default client;
