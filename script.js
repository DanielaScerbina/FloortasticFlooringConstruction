// initalizing variables
const about = document.querySelector(".abtNav");
const aboutInfo = document.getElementById("aboutInfo");

const services = document.querySelector(".servNav");
const servicesPageOverlay = document.getElementById("servicesPage");

const contactMe = document.querySelector(".cnctNav");
const contactMeForm = document.getElementById("contactMeForm");

const submitButton = document.querySelector("#submit");
const custName = document.querySelector("#name");
const message = document.querySelector("#message");
const number = document.querySelector("#phone-number");
const email = document.querySelector("#email");
const error = document.querySelector("#form-error");
const form = document.querySelector("#contactForm");
const thankYouOverlay = document.querySelector(".thankyou");

//image carousel
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//when click on about link on the nav, page scrolls to
about.addEventListener("click", () => {
  aboutInfo.scrollIntoView();
});

//when click on services link on the nav, services page is opened
services.addEventListener("click", () => {
  servicesPageOverlay.classList.remove("invisible");
});

//when click on contact link on the nav, page scrolls to
contactMe.addEventListener("click", () => {
  contactMeForm.scrollIntoView();
});

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
