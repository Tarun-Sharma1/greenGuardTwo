// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import { getDatabase, set, get, ref } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeavyWBVJWefOPEbFRzRCQRvnjQOhf-Nk",
  authDomain: "greenguard-2482d.firebaseapp.com",
  databaseURL: "https://greenguard-2482d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "greenguard-2482d",
  storageBucket: "greenguard-2482d.appspot.com",
  messagingSenderId: "595233501658",
  appId: "1:595233501658:web:05138621e51229302690e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth();
const db = getDatabase();

// Get DOM elements
const emailInput = document.getElementById('loginInputEmail');
const passwordInput = document.getElementById('loginInputPassword');

const submitButton = document.getElementById('loginButton');

// Add event listener to the submit button
submitButton.addEventListener("click", function (event){
  event.preventDefault();
  
  const email = emailInput.value
  const password = passwordInput.value;
  
  alert(5000);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert(user.uid)
      alert("Sign In Successfully");

      window.location.href = "main.html";
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});


// function readData(){
//   const userRef = ref(db, 'users');

//  get(userRef).then((snapshot)=>{
//   snapshot.forEach((childsnapShot)=>{
//     console.log(childsnapShot.val());
//   })
//  })
// }