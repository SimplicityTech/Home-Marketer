import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {  
    apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
    authDomain: "https://www.homemarketer.co.za",
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
                document.getElementById('statusMessage').innerText = `
                    House Search: ${data.houseSearch || 'N/A'}
                    Bond: ${data.bond || 'N/A'}
                    Building: ${data.building || 'N/A'}
                `;
            } else {
                document.getElementById('statusMessage').innerText = "No application status found.";
            }
        } catch (error) {
            console.error("Error fetching application status:", error);
            document.getElementById('statusMessage').innerText = "Error fetching application status.";
        }
    } else {
        document.getElementById('statusMessage').innerText = "No authenticated user.";
    }
});
