import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import config from "./config";

// @init
const app = 0 < getApps().length ? getApp() : initializeApp(config);
// const auth = getAuth(app);
const db = getFirestore(app);
const dbRealtime = getDatabase(app);
const storage = getStorage(app);

const client = {
  app,
  config,
  // auth,
  db,
  dbRealtime,
  storage,
};

export default client;
