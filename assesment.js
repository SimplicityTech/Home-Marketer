// Function to get form values
function getAssessmentFormValues() {
  const values = {
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
      document.getElementById('additionalInfo1').value,
      document.getElementById('additionalInfo2').value,
    ]
  };
  console.log("Form values:", values); // Log the values to check if they are being retrieved correctly
  return values;
}

// Function to save affordability assessment to Firestore
async function saveAffordabilityAssessment() {
  const user = auth.currentUser;
  const assessmentDetails = getAssessmentFormValues();

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      console.log("Saving assessment details for user:", user.uid);
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
  console.log("Form submitted");
  saveAffordabilityAssessment();
});

// Monitor auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user.uid);
  } else {
    console.log("User signed out");
  }
});
