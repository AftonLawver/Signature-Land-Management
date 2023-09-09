

document.addEventListener("click", function (e) {
  if(e.target.classList.contains("gallery-item")) {
    const src = e.target.getAttribute("src");
    document.querySelector(".modal-img").src = src;
    const myModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    myModal.show();
  }
})

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("navbar")) {
    // take away collapsed class from button
    const navBarButton = document.getElementById("toggleButtonNavBar");
    navBarButton.classList.toggle("collapsed");
    const navMenu = document.getElementById("navmenu");
    navMenu.classList.remove("show");
  }
})


function validateFirstName() {
  const firstNameInput = document.getElementById('firstName');
  if (!firstNameInput.value.match(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/)) {
    let firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
    firstNameErrorMessage.innerHTML = "Please enter a valid first" +
      " name.";
    firstNameInput.style.border = "1px solid red";
    firstNameErrorMessage.style.display = "block";
    return false;
  }
  else {
    let firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
    firstNameInput.style.border = "1px solid green";
    firstNameErrorMessage.style.display = "none";
    return true;
  }
}

function validateServices() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]',
  );

  if (!atLeastOneCheckboxChecked(checkboxes)) {
    const servicesErrorMessage = document.getElementById("servicesErrorMessage");
    servicesErrorMessage.style.display = "block";
  }
  else {
    const servicesErrorMessage = document.getElementById("servicesErrorMessage");
    servicesErrorMessage.style.display = "none";
  }

  // need to remove services error message when one checkbox is
  // checked.

}

function validatePhone() {
  const phoneNumberInput = document.getElementById('phoneNumber');
  const phoneNumberErrorMessage = document.getElementById("phoneErrorMessage");
  if (!phoneNumberInput.value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
    phoneNumberErrorMessage.innerHTML = "Please enter a valid phone" +
      " number.";
    phoneNumberInput.style.border = "1px solid red";
    phoneNumberErrorMessage.style.display = "block";
    return false;
  }
  else {
    phoneNumberInput.style.border = "1px solid green";
    phoneNumberErrorMessage.style.display = "none";
    return true;
  }
}
function validateForm() {
  if (validateFirstName() && validatePhone() && validateServices()) {
    return true;
  }
  else {
    return false;
  }
}

function atLeastOneCheckboxChecked(checkboxes) {
  return Array.from(checkboxes).some(
    checkbox => checkbox.checked,
  );
}



function findAllSelectedCheckboxes(checkboxes) {
  return Array.from(checkboxes).filter(
    checkbox => checkbox.checked,
  );
}


