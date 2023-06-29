import { app } from "./firebaseConfig.js"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"

const provider = new GoogleAuthProvider();

const auth = getAuth(app);
const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const authForm = document.querySelector('.login-container');
const colorPicker = document.querySelector('.picker-container');
const signUpButton = document.querySelector('#signUpButton');
const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#signOutButton');
const googleSignInButton = document.querySelector('#signup');

const userGoogleSignIn = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(result);
    alert('Google Sign In Successful!');
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    console.log(errorCode + errorMessage);
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}




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

googleSignInButton.addEventListener('click', (e) => {
  e.preventDefault();
  userGoogleSignIn();
});

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
