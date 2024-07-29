import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
    authDomain: "registration-homemarketer.firebaseapp.com",
    projectId: "registration-homemarketer",
    storageBucket: "registration-homemarketer.appspot.com",
    messagingSenderId: "764247926799",
    appId: "1:764247926799:web:838d65e930acc8ae849b7a"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to update the status on the page
async function updateStatus() {
  const user = auth.currentUser;
  if (user) {
    const statusDocRef = doc(db, "clients", user.uid); // Assuming 'clients' is your collection
    try {
      const docSnap = await getDoc(statusDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        document.querySelector('input[name="houseSearch"]').value = data.houseSearchStatus || 'Unknown';
        document.querySelector('input[name="bond"]').value = data.bondStatus || 'Unknown';
        document.querySelector('input[name="building"]').value = data.buildingStatus || 'Unknown';
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  } else {
    console.log("User is not signed in.");
  }
}

// Monitor auth state changes and update status
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateStatus();
  }
});