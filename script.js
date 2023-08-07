// initalizing variables
const home = document.querySelector(".homeNav");

const about = document.querySelector(".abtNav");
const abtNav = document.getElementById("abt");
const aboutInfo = document.getElementById("aboutInfo");

const services = document.querySelector(".servNav");

const contactMe = document.querySelector(".cnctNav");
const cnctNav = document.getElementById("cnct");
const contactMeForm = document.getElementById("contactMeForm");

const submitButton = document.querySelector("#submit");
const custName = document.querySelector("#name");
const message = document.querySelector("#message");
const number = document.querySelector("#phone-number");
const email = document.querySelector("#email");
const error = document.querySelector("#form-error");
const form = document.querySelector("#contactForm");
const thankYouOverlay = document.querySelector(".thankyou");

//home button on nav brings it back to the top
home.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

//when click on about link on the nav, page scrolls to
about.addEventListener("click", () => {
  aboutInfo.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
});

//when click on services link on the nav, page reveals
services.addEventListener("click", () => {
  servPgOverlay.classList.remove("invisible");
});

//when click on contact link on the nav, page scrolls to
contactMe.addEventListener("click", () => {
  contactMeForm.scrollIntoView({
    behavior: "smooth",
  });
});

// variables and function to make the services nav buttons work
const servPgOverlay = document.getElementById("servicesPage");
function removeOverlay() {
  if (servPgOverlay.classList.contains("servPgOverlay")) {
    servPgOverlay.classList.toggle("invisible");
  }
}

abtNav.addEventListener("click", function () {
  removeOverlay();
});

cnctNav.addEventListener("click", function () {
  removeOverlay();
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
  loadingImg.setAttribute("src", "frontPageImgs\bubble-loading.svg");
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
