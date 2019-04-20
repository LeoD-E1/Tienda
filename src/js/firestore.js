

// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCLXEGETb6pWNvmukEtYAGv4jTaYyjDpV0",
//     authDomain: "tiendaonline-5a179.firebaseapp.com",
//     databaseURL: "https://tiendaonline-5a179.firebaseio.com",
//     projectId: "tiendaonline-5a179",
//     storageBucket: "tiendaonline-5a179.appspot.com",
//     messagingSenderId: "83667291581"
//   };
//   firebase.initializeApp(config);
// </script>


firebase.initializeApp({
  apiKey: "AIzaSyCLXEGETb6pWNvmukEtYAGv4jTaYyjDpV0",
  authDomain: "tiendaonline-5a179.firebaseapp.com",
  databaseURL: "https://tiendaonline-5a179.firebaseio.com",
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
  var user = user;
  //Registro en auth

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      verificar();
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
    firebase.auth().onAuthStateChanged(function(user) {
      if(user.emailVerified){
        redirect();
      }else {
        console.log("Primero verifique su correo");
      }
    })
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

      var displayName = user.displayName;
      var email = user.email;
        console.log(email);
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

function verificar(){

  var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log("verificando...");
    }).catch(function(error) {
      console.log(error);
      // An error happened.
  });
}

function iniciarGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/admin.directory.customer');

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(error);
  // ...
});
}
