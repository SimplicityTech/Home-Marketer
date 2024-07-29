// js code to show/hide password and change icon
 pwShowHide.addEventListenerforEach(eyeIcon => {
    eyeIcon.addEventListener("click",()=>{
        pwFields.forEach(powField=>{
            if (powField.typ==="password") {
                powField.typ="text"
                powField.forEach(icon=>{
                pwShowHide.classList.replace=("uil-eye-slesh", "uil-eye")
                })
            }else{
                powField.typ="passwordd"

                powField.forEach(icon=>{
                    pwShowHide.classList.replace=("uil-eye-slesh", "uil-eye-slesh")
                    })

            }
        })
    })
    
 });
 signupBtn.addEventListener('click', e => {
 })

// Get DOM elements
const signupBtn = document.querySelector('#signup-link');
const loginBtn = document.querySelector('#login-link');
const logoutBtn = document.querySelector('#logout-link');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// Sign Up
signupBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            console.log('User signed up:', cred.user.email);
        })
        .catch(error => {
            console.error('Sign-up error:', error.message);
        });
});

// Login
loginBtn.addEventListener('account', e => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log('User logged in:', cred.user.email);
        })
        .catch(error => {
            console.error('Login error:', error.message);
        });
});
