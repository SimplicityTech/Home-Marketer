import { GithubAuthProvider } from 'firebase/auth';
const provider = new GithubAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyABbx6yhhAN0DAhx7FjPRPU-vKyRJUWtR8",
        authDomain: "http://www.homemarketer.co.za/",
        projectId: "registration-homemarketer",
        storageBucket: "registration-homemarketer.appspot.com",
        messagingSenderId: "764247926799",
        appId: "1:764247926799:web:838d65e930acc8ae849b7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('imageInput').files[0];
    const clientId = 'client-id'; // Replace with the client's actual ID
    const storageRef = ref(storage, 'clientImages/' + clientId + '/' + file.name);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }).catch((error) => {
        console.error('Upload failed', error);
    });
});
