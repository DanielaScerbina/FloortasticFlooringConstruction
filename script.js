//minified JS
var home = document.querySelector(".homeNav"),
  about = document.querySelector(".abtNav"),
  abtNav = document.getElementById("abt"),
  aboutInfo = document.getElementById("aboutInfo"),
  services = document.querySelector(".servNav"),
  contactMe = document.querySelector(".cnctNav"),
  cnctNav = document.getElementById("cnct"),
  contactMeForm = document.getElementById("contactMeForm"),
  submitButton = document.querySelector("#submit"),
  custName = document.querySelector("#name"),
  message = document.querySelector("#message"),
  number = document.querySelector("#phone-number"),
  email = document.querySelector("#email"),
  error = document.querySelector("#form-error"),
  form = document.querySelector("#contactForm"),
  thankYouOverlay = document.querySelector(".thankyou");
home.addEventListener("click", function () {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
about.addEventListener("click", function () {
  aboutInfo.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
});
contactMe.addEventListener("click", function () {
  contactMeForm.scrollIntoView({ behavior: "smooth" });
});
document.addEventListener("keydown", function (a) {
  "Escape" === a.key && thankYouOverlay.classList.add("invisible");
});
var isValid = function () {
    return (
      0 < custName.value.length &&
      0 < message.value.length &&
      (0 < email.value.length || 0 < number.value.length)
    );
  },
  inputCheck = function () {
    isValid()
      ? submitButton.removeAttribute("disabled")
      : submitButton.setAttribute("disabled", !0);
  };
inputCheck();
custName.addEventListener("input", function () {
  inputCheck();
});
message.addEventListener("input", function () {
  inputCheck();
});
number.addEventListener("input", function () {
  inputCheck();
});
email.addEventListener("input", function () {
  inputCheck();
});
form.addEventListener("submit", function (a) {
  a.preventDefault();
  a = new FormData(a.target);
  submitButton.setAttribute("disabled", !0);
  var b = document.createElement("img");
  b.setAttribute("src", "frontPageImgs\bubble-loading.svg");
  submitButton.innerHTML = "";
  submitButton.appendChild(b);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(a).toString(),
  })
    .then(function () {
      thankYouOverlay.classList.remove("invisible");
    })
    ["catch"](function (c) {
      console.error(c);
      error.classList.remove("invisible");
    })
    ["finally"](function () {
      submitButton.removeAttribute("disabled");
      submitButton.innerHTML = "Submit";
    });
});
var closeSecButton = document.querySelector("#close-thank");
closeSecButton.addEventListener("click", function () {
  thankYouOverlay.classList.add("invisible");
});

/* initalizing variables
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

//when click on contact link on the nav, page scrolls to
contactMe.addEventListener("click", () => {
  contactMeForm.scrollIntoView({
    behavior: "smooth",
  });
});

/* can exit thank you page using the esc key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    thankYouOverlay.classList.add("invisible");
  }
});

/*disables button until text is typed into name & message input 
    areas (the 'required' fields),and checks if there is text in 
    either the phone or email text area,then enables, 
    then disables again when text is deleted.
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
*/
