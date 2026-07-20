import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { 
    getAuth,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyASVwoxjL0ZHSF6kOIxGOMks1A-9NllUMw",
    authDomain: "plingifyplug.firebaseapp.com",
    projectId: "plingifyplug",
    appId: "1:198551817496:web:e7d84490321637448a226d",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);