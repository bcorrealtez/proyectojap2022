const lisCarrito = document.getElementById('listaCompra')
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
        }
        lisCarrito.innerHTML += htmlConToAppend;
    }
}

function cambioCant(nCount, item) {
    currentCartList[item].count = nCount
    document.getElementById("cant"+item).value = nCount;
    document.getElementById("price"+item).innerHTML = `${currentCartList[item].currency} ${currentCartList[item].unitCost * nCount}`;
}

function cambioCantMas(item){
    let nCount = currentCartList[item].count+1;
    cambioCant(nCount, item)
}

function cambioCantMenos(item){
    let nCount = Math.max(currentCartList[item].count-1 , 1);
    cambioCant(nCount, item)
}

document.addEventListener('DOMContentLoaded',(e)=>{
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status==="ok") {
            currentCartList = resultObj.data.articles
            showCartList();
        }
    });
});


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