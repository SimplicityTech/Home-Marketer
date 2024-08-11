import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {  
    apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
    authDomain: "www.homemarketer.co.za",
    projectId: "registration-homemarketer",
    storageBucket: "registration-homemarketer.appspot.com",
    messagingSenderId: "764247926799",
    appId: "1:764247926799:web:838d65e930acc8ae849b7a"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                document.getElementById('houseSearch').value = data.houseSearch || '';
                document.getElementById('bond').value = data.bond || '';
                document.getElementById('building').value = data.building || '';
            } else {
                console.log("No application status found.");
            }
        } catch (error) {
            console.error("Error fetching application status:", error);
        }
    } else {
        console.log("No authenticated user.");
    }
});

