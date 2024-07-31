// Import the functions you need from the SDKs you need
import { GithubAuthProvider } from 'firebase/auth';
const provider = new GithubAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
    authDomain: "https://registration-homemarketer.firebaseapp.com/__/auth/handler",
    projectId: "registration-homemarketer",
    storageBucket: "registration-homemarketer.appspot.com",
    messagingSenderId: "764247926799",
    appId: "1:764247926799:web:838d65e930acc8ae849b7a"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to get form values
function getFormValues() {
  return {
    fullName: document.getElementById('fullName').value,
    address: {
      streetNumber: document.getElementById('streetNumber').value,
      streetName: document.getElementById('streetName').value,
      suburb: document.getElementById('suburb').value,
      city: document.getElementById('city').value,
      province: document.getElementById('province').value,
      country: document.getElementById('country').value
    },
    phoneNumber: document.getElementById('phoneNumber').value,
    alternativeNumber: document.getElementById('alternativeNumber').value,
    email: document.getElementById('email').value
  };
}

// Function to save personal details to Firestore
async function savePersonalDetails() {
  const userDetails = getFormValues();
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      await setDoc(userDocRef, { personalDetails: userDetails }, { merge: true });
      console.log("Personal details saved successfully.");
    } catch (error) {
      console.error("Error saving personal details:", error);
    }
  } else {
    console.log("User is not signed in.");
  }
}

// Event listener for form submission
document.getElementById('personal').addEventListener('submit', (e) => {
  e.preventDefault();
  savePersonalDetails();
});
