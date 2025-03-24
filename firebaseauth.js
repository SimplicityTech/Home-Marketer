// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getAuth, sendPasswordResetEmail, signInWithEmailPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {  
  apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
  authDomain: "www.homemarketer.co.za",
  projectId: "registration-homemarketer",
  storageBucket: "registration-homemarketer.appspot.com",
  messagingSenderId: "764247926799",
  appId: "1:764247926799:web:838d65e930acc8ae849b7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('registrationForm').addEventListener('submit', submitForm);

async function submitForm(e) {
  e.preventDefault();

  const fullName = getElementVal('fullname');
  const emailid = getElementVal('Email');
  const phoneNumber = getElementVal('phoneNumber');
  const createPassword = getElementVal('CreatePassword');
  const confirmPassword = getElementVal('confirmPassword');

  console.log("Form Data:", { fullName, emailid, phoneNumber, createPassword, confirmPassword });

  if (createPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailid, createPassword);
    const user = userCredential.user;
    console.log("User created:", user);

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      emailid,
      phoneNumber
    });

    alert("User registered successfully!");

    // Redirect to account page
    window.location.href = 'account.html';
  } catch (error) {
    console.error("Error creating user:", error);
    alert("Error creating user: " + error.message);
  }
}

function getElementVal(id) {
  return document.getElementById(id).value;
}
