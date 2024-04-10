import {applicationDefault, initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

function initializeFirebase() {
    try {
        const firebaseApp = initializeApp({
            credential: applicationDefault()
        });
        const auth = getAuth(firebaseApp);
        return {firebaseApp, auth};

    } catch (e) {
        console.error(`Configuration Error ${e}`);
        console.error(`Check GOOGLE_APPLICATION_CREDENTIALS`);
    }
}

export const getFirebase = initializeFirebase();