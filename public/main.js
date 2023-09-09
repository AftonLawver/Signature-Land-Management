

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

// function validateForm() {
//   const firstNameInput = document.getElementById('firstName').value;
//   if (firstNameInput == "") {
//     let firstNameErrorMessage = document.getElementById("firstNameErrorMessage");
//     firstNameErrorMessage.style.display = "block";
//     // alert("First must be filled out");
//     return false;
//   }
//
//   let phoneNumber = document.getElementById('phoneNumber').value;
//   if (phoneNumber == "") {
//   //
//     let phoneNumberErrorMessage = document.getElementById('phoneErrorMessage');
//     phoneNumberErrorMessage.style.display = 'block';
//     return false;
//   }
  // const regexForPhone = /^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$/;
  // if (regexForPhone.test(phoneNumber)) {
  //   //
  //   let phoneNumberErrorMessage = document.getElementById('phoneErrorMessage');
  //   phoneNumberErrorMessage.style.display = 'block';
  //   phoneNumberErrorMessage.value = "Invalid phone number format. Use (123) 456-7899";
  //   return false;
  // }


// }
