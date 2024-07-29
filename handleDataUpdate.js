import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Assuming you've already initialized Firebase and Firestore
const db = getFirestore();

async function updateUserDetails(userId, updatedDetails) {
  const userDocRef = doc(db, "users", userId);

  try {
    await updateDoc(userDocRef, {
      personalDetails: updatedDetails
    });
    console.log("User details updated successfully.");
  } catch (error) {
    console.error("Error updating user details:", error);
  }
}

// Example usage:
// updateUserDetails('user-id-here', {
//   fullName: 'New Full Name',
//   address: 'New Address',
//   phoneNumber: 'New Phone Number',
//   // ... other updated fields
// });
