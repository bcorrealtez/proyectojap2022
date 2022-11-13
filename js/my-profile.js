const pNom = document.querySelector("#pNom");
const sNom = document.querySelector("#sNom");
const pApe = document.querySelector("#pApe");
const sApe = document.querySelector("#sApe");
const contacto = document.querySelector("#contacto");
const mail = document.querySelector("#mail");
const guardar = document.querySelector("form button");
const usuario = JSON.parse(localStorage.getItem("user"));

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  forms[0].addEventListener("input", ()=>{
    guardar.removeAttribute("disabled");
  });
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
          usuario.pNombre = pNom.value;
          usuario.sNombre = sNom.value;
          usuario.pApellido = pApe.value;
          usuario.sApellido = sApe.value;
          usuario.nContacto = contacto.value;
          usuario.mail = mail.value;
          localStorage.setItem("user", JSON.stringify(usuario));
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

document.addEventListener("DOMContentLoaded", () => {
  pNom.value = usuario.pNombre;
  sNom.value = usuario.sNombre;
  pApe.value = usuario.pApellido;
  sApe.value = usuario.sApellido;
  contacto.value = usuario.nContacto;
  mail.value = usuario.mail;

});