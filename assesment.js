// Import the functions you need from the SDKs you need
import { GithubAuthProvider } from 'firebase/auth';
const provider = new GithubAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
  authDomain: "http://www.homemarketer.co.za__/auth/handler",
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
function getAssessmentFormValues() {
    return{
    employmentStatus: document.getElementById('employment').value,
    annualIncome: document.getElementById('income').value,
    additionalIncome: document.getElementById('additional').value,
    additionalIncomeExplanation: document.getElementById('incoExplanation').value,
    monthlyExpenditure: document.getElementById('HouseExpe').value,
    debts: document.getElementById('debtList').value,
    creditScore: document.getElementById('creditScore').value,
    propertyType: document.getElementById('houseType').value,
    preferredLocation: document.getElementById('preferdLocation').value,
    maximumPurchasePrice: document.getElementById('maximumPrice').value,
    futureIncomeChanges: document.getElementById('futurePlans').value,
    majorLifeEvents: document.getElementById('PlannedEvent').value,
    additionalInfo: [
      document.getElementById('Additional info1').value,
      document.getElementById('Additional info2').value,
    ]
  }
}

// Function to save affordability assessment to Firestore
async function saveAffordabilityAssessment() {
  const user = auth.currentUser;
  const assessmentDetails = getAssessmentFormValues();

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      await setDoc(userDocRef, { affordabilityAssessment: assessmentDetails }, { merge: true });
      console.log("Affordability assessment saved successfully.");
    } catch (error) {
      console.error("Error saving affordability assessment:", error);
    }
  } else {
    console.log("User is not signed in.");
  }
}

// Event listener for form submission
document.getElementById('assesmentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  saveAffordabilityAssessment();
});


// Monitor auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, you can handle user-specific logic here
  } else {
    // User is signed out
  }
});


