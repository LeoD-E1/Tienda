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
      setTimeout(showSlides,3000);
}

// Fin Slider
