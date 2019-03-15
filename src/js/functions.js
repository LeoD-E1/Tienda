// --slider

var slideIndex = 0;

showSlides();

function showSlides() {
      var i;
      var slides = document.getElementsByClassName("imagenSlider");
      for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
         slides[slideIndex-1].style.display = "block";
      }
      slideIndex++;
      if(slideIndex > slides.length) {slideIndex = 1}
      setTimeout(showSlides,3000);
}

// Fin Slider

// ---------------Firebase---------------------->

function registrar(){

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;


  firebase.auth().createUserWithEmailAndPassword(email, password)

  .then(function(){
    verificarUser();
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

function Ingreso() {

  let emailIngreso = document.getElementById("emailIngreso").value;
  let passwordIngreso = document.getElementById("passwordIngreso").value;

  firebase.auth().signInWithEmailAndPassword(emailIngreso, passwordIngreso)
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
      // User is signed in.
      console.log("usuario activo")
      mostrar(user);

      var displayName = user.displayName;
      var email = user.email;

      console.log(user);
      console.log("********************");
      console.log(user.emailVerified);
      console.log("********************");

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // ...
    } else {
        // User is signed out.
        console.log("no existe usuario activo")
        // ...
      }
  });
}
observador();

function mostrar(user) {
  var user = user;
  let content = document.getElementById("userRegistrado");

  if (user.emailVerified){
    content.innerHTML = `
      <h1>Bienvenido!</h1>
      <button onclick="salir()">Salir</button>
    `;
  }
}

function salir(){
  firebase.auth().signOut()
  .then(function(){
    console.log("saliendo...")
  })
  .catch(function(error){
    console.log(error)
  })
}

function verificarUser() {

  var user = firebase.auth().currentUser;

  user.sendEmailVerification()
  .then(function() {
    // Email sent.
    console.log("enviando verificacion...");
  })
  .catch(function(error) {
    // An error happened.
    console.log(error);
  });
}
