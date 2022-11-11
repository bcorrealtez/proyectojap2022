const user = {
  pNombre: "",
  sNombre: "",
  pApellido: "",
  sApellido: "",
  mail: "",
  nContacto: ""
}

if (JSON.parse(localStorage.getItem("user")).mail.length) {
  window.location.replace("home.html");
}

const dAlerta = document.getElementById("alert-danger");

function setMailValue(valor) {
  user.mail = valor;
  localStorage.setItem("user", JSON.stringify(user));
  window.location.replace("home.html");
}

function showAlertError() {
  dAlerta.classList.add("show");
}
const form = document.querySelector("form");
const btn = document.querySelector("#ingBtn");

(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
          showAlertError();
        } else {
          var mail = form.email.value;
          setMailValue(mail);
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
const dClose = dAlerta.querySelector(".btn-close");

dClose.addEventListener("click", () => {
  dAlerta.classList.remove("show");
  form.querySelector("#email").value = "";
  form.querySelector("#pass").value = "";
});
