import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // ... your config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to retrieve personal details
async function retrievePersonalDetails() {
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const personalDetails = docSnap.data().personalDetails;
        console.log("Personal details:", personalDetails);
        // Use `personalDetails` as needed in your app
      } else {
        console.log("No personal details found.");
      }
    } catch (error) {
      console.error("Error retrieving personal details:", error);
    }
  } else {
    console.log("User is not signed in.");
  }
}

// Function to retrieve affordability assessment details
async function retrieveAffordabilityAssessment() {
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const affordabilityAssessment = docSnap.data().affordabilityAssessment;
        console.log("Affordability assessment:", affordabilityAssessment);
        // Use `affordabilityAssessment` as needed in your app
      } else {
        console.log("No affordability assessment found.");
      }
    } catch (error) {
      console.error("Error retrieving affordability assessment:", error);
    }
  } else {
    console.log("User is not signed in.");
  }
}

// Example usage:
// retrievePersonalDetails();
// retrieveAffordabilityAssessment();
