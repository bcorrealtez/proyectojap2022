if (localStorage.getItem("userMailVal")) {
    window.location.replace("home.html");
}

const dAlerta=document.getElementById("alert-danger");

function setMailValue(valor) {
    localStorage.setItem("userMailVal", valor);
    window.location.replace("home.html");
}

function showAlertError() {
    dAlerta.classList.add("show");
}
const form=document.querySelector('form');
const btn=document.querySelector('#ingBtn');

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    var mail=formData.email;
    var pass=formData.pass;

    if (mail=='' || pass=='' || pass.length<8) {
        showAlertError();
    } else {
        setMailValue(mail);
    }

});

const dClose=dAlerta.querySelector('.btn-close');

dClose.addEventListener('click', ()=>{
    dAlerta.classList.remove("show");
    form.querySelector('#email').value='';
    form.querySelector('#pass').value='';
});
