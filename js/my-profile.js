const pNom = document.querySelector("#pNom");
const sNom = document.querySelector("#sNom");
const pApe = document.querySelector("#pApe");
const sApe = document.querySelector("#sApe");
const contacto = document.querySelector("#contacto");
const mail = document.querySelector("#mail");
const user = JSON.parse(localStorage.getItem("user"));


(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          localStorage.setItem("user", JSON.stringify(user));
        }


        form.classList.add('was-validated')
      }, false)
    })
})()

document.addEventListener("DOMContentLoaded", () => {
  pNom.value = user.pNombre;
  sNom.value = user.sNombre;
  pApe.value = user.pApellido;
  sApe.value = user.sApellido;
  contacto.value = user.nContacto;
  mail.value = user.mail;

});