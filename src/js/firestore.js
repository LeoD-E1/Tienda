
firebase.initializeApp({
  apiKey: "AIzaSyCLXEGETb6pWNvmukEtYAGv4jTaYyjDpV0",
  authDomain: "tiendaonline-5a179.firebaseapp.com",
  projectId: "tiendaonline-5a179"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// function registrarUser(){
//
//   var nombre = document.getElementById('nameRegistro').value;
//   var email = document.getElementById('emailRegistro').value;
//   var contraseña = document.getElementById('passwordRegistro').value;
//
//   db.collection("usuarios").add({
//       nombre: nombre,
//       email: email,
//       contraseña: contraseña
//   })
//   .then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//       nombre = document.getElementById('nameRegistro').value = '';
//       email = document.getElementById('emailRegistro').value = '';
//       contraseña = document.getElementById('passwordRegistro').value = '';
//   })
//   .catch(function(error) {
//       console.error("Error adding document: ", error);
//   });
// }

function registrar(){

  var name = document.getElementById('nameRegistro').value;
  var email = document.getElementById('emailRegistro').value;
  var password = document.getElementById('passwordRegistro').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    });

  }

function iniciarSesion(){
  var email = document.getElementById('emailInicio').value;
  var password = document.getElementById('passwordInicio').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(
    function redirect(){
      location.href="../pages/userPrincipal.html"
    }
  )
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  });

}
