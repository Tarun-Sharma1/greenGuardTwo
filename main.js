// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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
let name_changed = document.getElementById("user_greeting");

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
     // alert("you are signe in");

     const userRef = ref(db, 'users/'+uid+"/name");
  
   get(userRef).then((snapshot)=>{
    name_changed.innerHTML = "Hi!"+ snapshot.val();
   })

      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const minerals = [
        {
            checkbox: document.getElementById('mineral1'), 
            value: document.getElementById('value1'), 
            dbPath: 'controls/valve_one'
        },
        {
            checkbox: document.getElementById('mineral2'), 
            value: document.getElementById('value2'), 
            dbPath: 'controls/valve_two'
        },
        {
            checkbox: document.getElementById('mineral3'), 
            value: document.getElementById('value3'), 
            dbPath: 'controls/valve_three'
        }
    ];
    minerals.forEach(function(mineral) {
      mineral.checkbox.addEventListener('change', function() {
          const value = this.checked ? true : false;
          mineral.value.textContent = value;
          // Update Firebase Realtime Database
          set(ref(db, mineral.dbPath), value)
              .then(() => {
                  console.log(`Successfully updated ${mineral.dbPath} to ${value}`);
              })
              .catch((error) => {
                  console.error(`Error updating ${mineral.dbPath}:`, error);
              });
      });

      // Initial value setting
      const initialValue = mineral.checkbox.checked ? '1' : '0';
      mineral.value.textContent = initialValue;
      // Set initial value in Firebase
      set(ref(db, mineral.dbPath), initialValue)
          .then(() => {
              console.log(`Successfully set ${mineral.dbPath} to ${initialValue}`);
          })
          .catch((error) => {
              console.error(`Error setting ${mineral.dbPath}:`, error);
          });
  });
});