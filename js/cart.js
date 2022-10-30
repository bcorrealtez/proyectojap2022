const lisCarrito = document.getElementById('listaCompra')
const checkboxes = document.querySelectorAll('.form-check-input');
var priceCount = 0;
var shipPrice = 0.15;

//------------ Muestra los precios de la compra ------------
function innerPrice() {
    document.getElementById("resumenSubtotal").innerHTML = `USD ${Math.round(priceCount * 100) / 100}`;
    document.getElementById("resumenEnvio").innerHTML = `USD ${Math.round(priceCount * shipPrice * 100) / 100}`;
    document.getElementById("resumenTotal").innerHTML = `USD ${Math.round((priceCount * shipPrice + priceCount))}`;
}

function showCartList() {
    priceCount = 0
    let htmlConToAppend = '';
    if (currentCartList) {
        for (let i = 0; i < currentCartList.length; i++) {
            htmlConToAppend += `
            <div class="row rounded-3 p-2 bg-white shadow mb-2">
                <div class="col-4 p-0 pe-2 my-auto">
                    <img src=${currentCartList[i].image} alt="" class="img-fluid rounded">
                </div>
                <div class="col-8 ps-3 flex-column align-content-center">
                    <div class="row">
                        <h2>${currentCartList[i].name}</h2>
                    </div>
                    <div class="row align-items-center p-0">
                        <div class="d-flex">
                            <p class="mb-0 text-muted text-decoration-underline">Costo</p>
                            <p class="mb-0">: ${currentCartList[i].currency} ${currentCartList[i].unitCost}</p>
                        </div>
                    </div>
                    <div class="row d-flex mt-2">
                        <div class="input-group">
                            <span class="me-3 p-0 bg-white" id="price${i}">${currentCartList[i].currency} ${currentCartList[i].unitCost * currentCartList[i].count}</span>
                            <i class="fa fa-minus input-group-text d-flex px-1 py-0 rounded-start" onclick="cambioCantMenos(${i})"></i>
                            <input type="text" id="cant${i}" class="form-control p-1 py-0 border-start-0 text-center border-end-0 bg-white" value="${currentCartList[i].count}" min="1"
                                aria-label="Dollar amount" disabled>
                            <i class="fa fa-plus input-group-text d-flex px-1 py-0" onclick="cambioCantMas(${i})"></i>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            `
            priceCount += currentCartList[i].count * (currentCartList[i].currency == "USD" ? currentCartList[i].unitCost : currentCartList[i].unitCost * 0.0245);

        }
        innerPrice();
        lisCarrito.innerHTML = htmlConToAppend;
    }
}

function deleteItem(item) {
    currentCartList.splice(item, 1);
    localStorage.setItem('articles', JSON.stringify(currentCartList));
    if (currentCartList.length) {
        showCartList()
    } else {
        document.querySelector("main > div.container").innerHTML = `
        <div class="text-center mt-5">
            <img src="img/emptycart.svg" alt="emptycart" class="w-25">
            <div class="row py-4">
                <h1>Tu carrito está vacío</h1>
                <a href="categories.html" class="link-dark">Encuentra artículos para tu carrito</a>
            </div>
        </div>`;
    }
}

checkboxes[0].addEventListener('click', () => {
    shipPrice = 0.15
    innerPrice();
})
checkboxes[1].addEventListener('click', () => {
    shipPrice = 0.07
    innerPrice();
})
checkboxes[2].addEventListener('click', () => {
    shipPrice = 0.05
    innerPrice();
})

//------------ Cambia la cantidad de artículos y precios correspondientes ------------
function cambioCant(nCount, item) {
    currentCartList[item].count = nCount
    document.getElementById("cant" + item).value = nCount;
    let prodPriceC = currentCartList[item].unitCost * nCount;
    document.getElementById("price" + item).innerHTML = `${currentCartList[item].currency} ${prodPriceC}`;
    innerPrice();
}

//------------ Aumenta la cantidad de artículos y precios correspondientes ------------
function cambioCantMas(item) {
    let nCount = currentCartList[item].count + 1;
    priceCount += (currentCartList[item].currency == "USD" ? currentCartList[item].unitCost : currentCartList[item].unitCost * 0.0245);
    cambioCant(nCount, item)
}

//------------ Disminuye la cantidad de artículos y precios correspondientes ------------
function cambioCantMenos(item) {
    let nCount = currentCartList[item].count;
    if (nCount > 1) {
        priceCount -= (currentCartList[item].currency == "USD" ? currentCartList[item].unitCost : currentCartList[item].unitCost * 0.0245);
    }
    nCount = Math.max(currentCartList[item].count - 1, 1);
    cambioCant(nCount, item)
}

document.addEventListener('DOMContentLoaded', (e) => {

    if (JSON.parse(localStorage.getItem('articles')).length) {
        currentCartList = JSON.parse(localStorage.getItem('articles'))
        showCartList();
    } else {
        document.querySelector("main > div.container").innerHTML = `
        <div class="text-center mt-5">
            <img src="img/emptycart.svg" alt="emptycart" class="w-25">
            <div class="row py-4">
                <h1>Tu carrito está vacío</h1>
                <a href="categories.html" class="link-dark">Encuentra artículos para tu carrito</a>
            </div>
        </div>`;
    }

    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentMsg = resultObj.data.msg
            document.querySelector("#alert-success p").innerHTML = currentMsg;
        }
    });
});

let tarRadio = document.getElementById("tarjeta");
let tarTrans = document.getElementById("transferencia");

//------------ Muestra los campos del método de pago por tarjeta ------------
tarRadio.addEventListener("click", () => {
    document.getElementById('collapseTransfer').classList.remove("show");
    document.getElementById('collapseTarjeta').classList.add("show");
    tarRadio.querySelectorAll('input').forEach(elem => elem.removeAttribute('disabled', ''));
    tarTrans.querySelector('input').setAttribute('disabled', '');
});

//------------ Muestra los campos del método de pago por transferencia ------------
tarTrans.addEventListener("click", () => {
    document.getElementById('collapseTransfer').classList.add("show")
    document.getElementById('collapseTarjeta').classList.remove("show")
    tarRadio.querySelectorAll('input').forEach(elem => elem.setAttribute('disabled', ''));
    tarTrans.querySelector('input').removeAttribute('disabled', '');
});

const sAlerta = document.getElementById("alert-success");
const sClose = sAlerta.querySelector('.btn-close');
function showAlertSuccess() {
    sAlerta.classList.add("show");
}

//------------ Validación ------------
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')
    var form = Array.prototype.slice.call(forms)
    form[0].addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (form[0].checkValidity()) {
            document.getElementById("modalBtn").setAttribute("data-bs-toggle", "modal")
            document.getElementById("modalBtn").click()
            document.getElementById("modalBtn").removeAttribute("data-bs-toggle", "modal")
        }
        form[0].classList.add('was-validated')
    }, false)
    
    form[1].addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (form[1].checkValidity()) {
            showAlertSuccess();
            sClose.addEventListener('click', () => {
                currentCartList.splice(0, currentCartList.length);
                localStorage.setItem('articles', JSON.stringify(currentCartList));
                form[1].submit();

            });
        }
        form[1].classList.add('was-validated')
    }, false)
})()