// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
const auth = getAuth();
const db = getDatabase();
let nameChanged = document.getElementById("user_greeting");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid + "/name");

    get(userRef).then((snapshot) => {
      nameChanged.innerHTML = "Hi! " + snapshot.val();
    }).catch((error) => {
      console.error("Error fetching user name:", error);
    });
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
      set(ref(db, mineral.dbPath), value)
        .then(() => {
          console.log(`Successfully updated ${mineral.dbPath} to ${value}`);
        })
        .catch((error) => {
          console.error(`Error updating ${mineral.dbPath}:`, error);
        });
    });

    const initialValue = mineral.checkbox.checked ? true : false;
    mineral.value.textContent = initialValue;
    set(ref(db, mineral.dbPath), initialValue)
      .then(() => {
        console.log(`Successfully set ${mineral.dbPath} to ${initialValue}`);
      })
      .catch((error) => {
        console.error(`Error setting ${mineral.dbPath}:`, error);
      });
  });

  // Function to read sensor values from Firebase
  function readSensorValues() {
    const sensorRef = ref(db, 'Sensor');
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log("Sensor data:", data);
        document.getElementById('humidity').innerText = data.Humidity;
        document.getElementById('soilMoisture').innerText = data.SoilMoisture;
        document.getElementById('solarCurrent').innerText = data['Solar Current'];
        document.getElementById('temperature').innerText = data.Temperature;
        document.getElementById('ldrData').innerText = data.ldr_data;
        document.getElementById('solarPower').innerText = data.solarPower;
        document.getElementById('solarVoltage').innerText = data.solarVoltage;
      } else {
        console.log("No sensor data available");
      }
    }, (error) => {
      console.error("Error reading sensor data:", error);
    });
  }

  // Call the function to read sensor values
  readSensorValues();
});
