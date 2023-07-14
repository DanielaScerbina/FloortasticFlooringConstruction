// initalizing variables
const contactMe = document.querySelector(".cnct-btn");
const contactMeForm = document.getElementById("contactMeForm");
const submitButton = document.querySelector("#submit");
const custName = document.querySelector("#name");
const message = document.querySelector("#message");
const number = document.querySelector("#phone-number");
const email = document.querySelector("#email");
const error = document.querySelector("#form-error");
const form = document.querySelector("#contactForm");
var carouselContent = document.querySelector(".carousel-content");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");

/*contactMe.addEventListener("click", () => {
  contactMeForm.scrollIntoView();
});*/

/* can exit thank you page using the esc key*/
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    thankYouOverlay.classList.add("invisible");
  }
});

/*disables button until text is typed into name & message input 
    areas (the 'required' fields),and checks if there is text in 
    either the phone or email text area,then enables, 
    then disables again when text is deleted.*/
const isValid = () => {
  return (
    custName.value.length > 0 &&
    message.value.length > 0 &&
    (email.value.length > 0 || number.value.length > 0)
  );
};
const inputCheck = () => {
  if (isValid()) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", true);
  }
};
inputCheck();
custName.addEventListener("input", () => {
  inputCheck();
});

message.addEventListener("input", () => {
  inputCheck();
});

number.addEventListener("input", () => {
  inputCheck();
});

email.addEventListener("input", () => {
  inputCheck();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  submitButton.setAttribute("disabled", true);

  // replaces word submit on the submit button with an svg of a loading icon
  const loadingImg = document.createElement("img");
  loadingImg.setAttribute("src", "./bubble-loading.svg");
  submitButton.innerHTML = "";
  submitButton.appendChild(loadingImg);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      // makes the thank you page visible when submit button is clicked
      thankYouOverlay.classList.remove("invisible");
    })
    .catch((err) => {
      console.error(err);
      // if theres an error, shows an error message above button
      error.classList.remove("invisible");
    })

    .finally(() => {
      // re enables button after info is submitted
      submitButton.removeAttribute("disabled");
      submitButton.innerHTML = "Submit";
    });
});

// closes the thank you page using the X
const closeSecButton = document.querySelector("#close-thank");
closeSecButton.addEventListener("click", () => {
  thankYouOverlay.classList.add("invisible");
});

/* Image Carousel

var slideIndex = 0;
showSlide(slideIndex);

prevBtn.addEventListener("click", function () {
  showSlide((slideIndex -= 1));
});

nextBtn.addEventListener("click", function () {
  showSlide((slideIndex += 1));
});

function showSlide(index) {
  var slides = carouselContent.getElementsByTagName("img");
  var totalSlides = slides.length;

  if (index < 0) {
    slideIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    slideIndex = 0;
  }

  for (var i = 0; i < totalSlides; i++) {
    slides[i].style.transform = "translateX(" + -slideIndex * 600 + "px)";
  }
}
*/
