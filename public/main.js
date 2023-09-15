

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

// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=services]");
let requestedServices = []


checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    requestedServices =
        Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
            .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
            .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

    console.log(requestedServices)
    const servicesErrorMessage = document.getElementById("servicesErrorMessage");

    if (requestedServices.length === 0) {
      servicesErrorMessage.style.display = "block";
    }
    else {
      servicesErrorMessage.style.display = "none";
    }
  })
});

let form = document.getElementById("myForm");

form.addEventListener("submit", e => {
  // don't actually submit this form to its associated URL:
  e.preventDefault();

  if (validateFirstName() && validatePhone()) {
    let spinner = document.getElementById("spinner");
    spinner.style.display = "block";
    // send the data to the database

    const data = extractFormData();
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data),
    }

    fetch('/', options)
      .then(response => {
        if (response.ok) {
          spinner.style.display = "none";
          let loadingMessage = document.getElementById("loadingMessage");
          loadingMessage.style.display = "block";
          console.log("Data received by database.")
        }
        else {
          console.log("Data not received by database successfully.");
        }
      }).catch(err => {
      console.log('Error with database receiving data.')
    })
    return true;
  }
  return false;

});

function validateFirstName() {
  const firstNameInput = document.getElementById('firstName');
  if (!firstNameInput.value.match(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/)) {
    let firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
    firstNameErrorMessage.innerHTML = "Please enter a valid first" +
        " name.";
    firstNameInput.style.border = "1px solid red";
    firstNameErrorMessage.style.display = "block";
    return false;
  } else {
    let firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
    firstNameInput.style.border = "1px solid green";
    firstNameErrorMessage.style.display = "none";
    return true;
  }
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

function extractFormData() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let phoneNumber = document.getElementById('phoneNumber').value;
  let requestedServicesData = requestedServices;
  let comments = document.getElementById('formTextArea').value;
  return {Firstname: firstName, Lastname: lastName, Phone: phoneNumber, ServicesRequested: requestedServicesData, Message: comments};
}





