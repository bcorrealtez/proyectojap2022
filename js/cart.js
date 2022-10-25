const lisCarrito = document.getElementById('listaCompra')
var priceCount = 0;
var shipPrice = 0.15;
function changePrice(item) {
    priceCount += currentCartList[item].count * (currentCartList[item].currency == "USD" ? currentCartList[item].unitCost : currentCartList[item].unitCost / 43);
    document.getElementById("resumenEnvio").innerHTML = `USD ${priceCount*shipPrice}`;
}

function showCartList() {
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
                    </div>
                </div>
            </div>
            `
            changePrice(i)

        }

        document.getElementById("resumenSubtotal").innerHTML = `USD ${priceCount}`;
        lisCarrito.innerHTML += htmlConToAppend;
    }
}

function cambioCant(nCount, item) {
    currentCartList[item].count = nCount
    document.getElementById("cant" + item).value = nCount;
    let prodPriceC = currentCartList[item].unitCost * nCount
    document.getElementById("price" + item).innerHTML = `USD ${prodPriceC}`;
    document.getElementById("resumenSubtotal").innerHTML = `USD ${priceCount}`;
    document.getElementById("resumenEnvio").innerHTML = `USD ${priceCount * shipPrice}`;
}

function cambioCantMas(item) {
    let nCount = currentCartList[item].count + 1;
    priceCount += currentCartList[item].unitCost
    cambioCant(nCount, item)
}

function cambioCantMenos(item) {
    let nCount = currentCartList[item].count;
    if (nCount != 1) {
        priceCount -= currentCartList[item].unitCost
    }
    nCount = Math.max(currentCartList[item].count - 1, 1);
    cambioCant(nCount, item)
}

document.addEventListener('DOMContentLoaded', (e) => {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCartList = resultObj.data.articles
            showCartList();
        }
    });
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentMsg = resultObj.data.msg
            document.querySelector("#alert-success p").innerHTML = currentMsg;
        }
    });
});

let tarRadio = document.getElementById("tarjeta");
let tarTrans = document.getElementById("transferencia");

tarRadio.addEventListener("click", () => {
    document.getElementById('collapseTransfer').classList.remove("show");
    document.getElementById('collapseTarjeta').classList.add("show");
    tarRadio.querySelectorAll('input').forEach(elem => elem.removeAttribute('disabled', ''));
    tarTrans.querySelector('input').setAttribute('disabled', '');
});

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
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')
    var ind = 0;
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                event.stopPropagation()
                if (form.checkValidity()) {
                    document.getElementById("modalBtn").setAttribute("data-bs-toggle", "modal")
                    document.getElementById("modalBtn").click()
                    document.getElementById("modalBtn").removeAttribute("data-bs-toggle", "modal")
                    if (ind == 1) {
                        showAlertSuccess();
                        sClose.addEventListener('click', () => {
                            form.submit();

                        });
                    }
                    ind++;
                }
                form.classList.add('was-validated')
            }, false)
        });

})()



/*
{
    "user": 25801,
    "articles": [
        {
            "id": 50924,
            "name": "Peugeot 208",
            "count": 1,
            "unitCost": 15200,
            "currency": "USD",
            "image": "img/prod50924_1.jpg"
        }
    ]
}
*/