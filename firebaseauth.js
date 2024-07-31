// Import the functions you need from the SDKs you need
import { GithubAuthProvider } from 'firebase/auth';
const provider = new GithubAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const uiConfig = {
  signInFlow: 'popup',
  apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
  authDomain: "https://registration-homemarketer.firebaseapp.com/__/auth/handler",
  projectId: "registration-homemarketer",
  storageBucket: "registration-homemarketer.appspot.com",
  messagingSenderId: "764247926799",
  appId: "1:764247926799:web:838d65e930acc8ae849b7a"
  // ... your config
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

  if (createPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, emailid, createPassword);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: fullName,
      email: emailid,
      cell: phoneNumber,
    });
  
    // Redirect to account page
    window.location.href = 'account.html';
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Error signing up: " + error.message);
  }
}

function getElementVal(id) {
  return document.getElementById(id).value;
}
