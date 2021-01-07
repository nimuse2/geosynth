// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
console.log("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDK3k50MfL9rxfGi0uqKql5GaAgFMr4ajU",
  authDomain: "geosynth-39a78.firebaseapp.com",
  databaseURL: "https://geosynth-39a78.firebaseio.com",
  projectId: "geosynth-39a78",
  storageBucket: "geosynth-39a78.appspot.com",
  messagingSenderId: "1048064109355",
  appId: "1:1048064109355:web:6e6a484c2c77b17473f36e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/*
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
*/
var db = firebase.firestore();
// var geo = db.GeoPoint(37.422, 122.084);
var lat =  3.67;
var long =  50.43;
// let data = {
//   google: new Firestore.GeoPoint(37.422, 122.084)
// };
/*
db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815,
  other: "blurb",
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
*/
// Add a second document with a generated ID.
/*
db.collection("users").add({
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912,
  lat: lat,
  long: long
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
*/
//basic data read
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log("-->", doc.data());
  });
});

