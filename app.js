import { app } from "./firebaseConfig.js"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

const auth = getAuth(app);
const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const authForm = document.querySelector('.login-container');
const colorPicker = document.querySelector('.picker-container');
const signUpButton = document.querySelector('#signUpButton');
const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#signOutButton');

const checkAuthState = async() => {
    onAuthStateChanged(auth, user => {
      if(user) {
        authForm.style.display = 'none';
        colorPicker.style.display = 'flex'; 
      }
      else{
        authForm.style.display = 'flex';
        colorPicker.style.display = 'none';
      }
    })
  }

const userSignUp = async() => {
      const signUpEmail = userEmail.value;
      const signUpPassword = userPassword.value;

      createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        userEmail.value = "";
        userPassword.value = "";
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Signed Up Successfully!',
            showConfirmButton: true
        }).then(() => {
            setTimeout(checkAuthState(), 2000);
          })
      }) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
        console.log(errorCode + errorMessage);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Something went wrong!",
            showConfirmButton: true
        })
      })
}

const userSignIn = async() => {
  const signInEmail = userEmail.value;
  const signInPassword = userPassword.value;

  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    userEmail.value = "";
    userPassword.value = "";
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Signed In Successfully!',
        showConfirmButton: true
      }).then(() => {
        setTimeout(checkAuthState(), 2000);
      })
  }) 
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.errorMessage;
    console.log(errorCode + errorMessage);
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "User doesn't exist! Maybe try Signing Up?",
        showConfirmButton: true
    })
  })
}

const userSignOut = async() => {
  await signOut(auth);
  Swal.fire({
    icon: 'success',
    title: 'Logged Out!',
    text: "Logged Out Successfully!",
    showConfirmButton: true
})
}

signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    userSignUp();
});

signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    userSignIn();
});

signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    userSignOut();
});
