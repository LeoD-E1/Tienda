
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
//   var contrasena = document.getElementById('passwordRegistro').value;
//
//   db.collection("usuarios").add({
//       nombre: nombre,
//       email: email,
//       contraseña: contrasena
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

function redirect(){
  location.href="../pages/userPrincipal.html"
}

function registrar(){

  var name = document.getElementById('nameRegistro').value;
  var email = document.getElementById('emailRegistro').value;
  var password = document.getElementById('passwordRegistro').value;

  //Registro en auth

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      redirect();
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    });

  //Registro en Cloud

  db.collection("usuarios").add({
        nombre: name,
        email: email,
        contraseña: password
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        name = document.getElementById('nameRegistro').value = '';
        email = document.getElementById('emailRegistro').value = '';
        password = document.getElementById('passwordRegistro').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  }

function iniciarSesion(){
  var email = document.getElementById('emailInicio').value;
  var password = document.getElementById('passwordInicio').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){
    redirect();
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
  });
}



function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');


      var displayName = user.displayName;
      var email = user.email;

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user);
      // ...

    } else {
      // User is signed out.
      console.log("no existe usuario activo");
    }
  });
}
observador();

function cerrarSesion(){
  firebase.auth().signOut()
  .then(function (){
    console.log("saliendo...");
    location.href="../pages/iniciar.html"
  })
  .catch(function (error){
    console.log(error);
  })
}
