// Function to get form values
function getAssessmentFormValues() {
  return {
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
}



