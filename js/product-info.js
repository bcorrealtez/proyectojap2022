const btnAddCart = document.getElementById('addCart');
var articles = [];
//------------ Indicadores de carousel con imágenes pequeñas del producto ------------
function showSlIndicators() {
    let slideInd = '';
    for (let i = 0; i < prodImg.length; i++) {
        slideInd += `
        <div class="col-3 p-1">    
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${i}" 
            aria-current="true" aria-label="Slide ${i + 1}" class="p-0 border-0 shadow">
            <img src="${prodImg[i]}" alt="" class="img-thumbnail d-block w-100"></button>
        </div>
        `;
    }
    return slideInd;
}

//------------ Función que crea los ítems del carousel ------------
function showImages() {
    let imgList = '';

    for (let i = 0; i < prodImg.length; i++) {
        imgList += `
        <div class="carousel-item">
            <img src="${prodImg[i]}" alt="" class="d-block w-100">
        </div>
        `
    }
    return imgList;
}

//------------ Función que crea el html para mostrar la información del producto ------------
function showProductInfo() {
    document.querySelector("#product-header h1").innerHTML += currentProduct.name;
    document.querySelector('.carousel-inner').innerHTML = showImages();
    document.querySelector('#indicators').innerHTML = showSlIndicators();
    let prodInfoDiv = document.querySelectorAll("#prod-info-container>div");
    prodInfoDiv[0].innerHTML = `
    <div class="col d-flex justify-content-between">
        <h5>Precio</h5>
        <p>${currentProduct.currency} ${currentProduct.cost}</p>
    </div>
    `;
    prodInfoDiv[1].innerHTML = `
    <div class="col d-flex justify-content-between">
        <h5>Categoría</h5>
        <p>${currentProduct.category}</p>
    </div>
    `;
    prodInfoDiv[2].innerHTML = `
    <div class="col d-flex justify-content-between">
        <h5>Cantidad de vendidos</h5>
        <p>${currentProduct.soldCount}</p>
    </div>
    `;
    prodInfoDiv[3].innerHTML = `
    <div class="col-12 text-center">
        <h4>Descripción</h4>
    </div>
    <hr>
    <div class="col text-center ">
        <p>${currentProduct.description}</p>
    </div>
    `;

    // Se seleccionan primer item y primer indicador del carousel para asignarles la clase active para que funcione correctamente
    let fstItem = document.querySelector('.carousel-item');
    let fstInd = document.querySelector('button[aria-label="Slide 1"]')
    fstItem.classList.add("active")
    fstInd.setAttribute("id", "primerIndicador")
    document.querySelector('#primerIndicador').classList.add("active")
}

function showRelProd() {
    let relProd = '';
    let prod = currentProduct.relatedProducts;
    if (prod) {
        for (let i = 0; i < prod.length; i++) {
            relProd += `
            <div class="p-2">
                <div class="p-2 shadow border relProdContent rounded-3" onclick=redirProd(${prod[i].id})>
                    <img src="${prod[i].image}" alt="${prod[i].name}" class="img-thumbnail d-block w-100">
                    <label class="mt-1 ms-2 text-muted fs-6">${prod[i].name}</label>
                </div>
            </div>
            `;
        }
        document.querySelector('#relProdContent').innerHTML = relProd;
    } else {
        document.querySelector('#relProd').innerHTML = `<h3 class="text-muted fs-3">No hay productos relacionados.</h3>`;
    }
}

function redirProd(id) {
    localStorage.setItem('prodID', id);
    location.reload();
}

//------------ Función que marca el puntaje de estrellas al hacer un comentario ------------
let calif = document.querySelector('#star');
function rate(id) {
    let star = calif.querySelectorAll('i');
    for (let i = 0; i < star.length; i++) {
        i < id ? star[i].classList.add("checked") : star[i].classList.remove("checked");
    }
}

//------------ Función que marca el puntaje de estrellas de cada comentario en la lista de comentarios ------------
function rateScore(score) {
    rateCmnts = '';
    for (let i = 0; i < 5; i++) {
        i < score ? rateCmnts += "<i class='fa fa-star checked'></i>" : rateCmnts += "<i class='fa fa-star'></i>";
    }
    return rateCmnts;
}

//------------ Función que muestra la lista de comentarios ------------
function showProductComments() {
    let commentToAppend = '';
    let splitDate = '';
    for (let i = 0; i < currentComment.length; i++) {
        splitDate = currentComment[i].dateTime.split(" ", 2)
        commentToAppend += `
        <div class="row justify-content-center ">
            <div class="row px-3 pt-3 text-muted border-top border-light">
                <div class="col-xl-10 col-xxl-10 col-md-10 col-9 p-0">
                    <span>${currentComment[i].user}</span>  
                    <div class="text-break pb-3 pt-0">
                        <span class="text-dark p-0">${currentComment[i].description}</span> 
                    </div>
                </div>
                <div class="col text-end infoCmt">
                    <div class="row small p-0">
                        <label class="p-0 cmntStars" id="i"> 
                            ${rateScore(currentComment[i].score)
            // Muestra el puntaje del comentario
            }
                        </label>
                    </div>
                    <div class="row">
                        <span class="p-0">${splitDate[0]}</span>
                    </div>
                    <div class="row">
                        <span class="p-0">${splitDate[1]}</span>
                    </div>
                </div>
            </div>
        </div>
        `



    }
    document.getElementById('cmntSection').innerHTML += commentToAppend;
}
const divCartBtn = document.getElementById("btnCarrito")

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProduct = resultObj.data;
            prodImg = currentProduct.images;
            showProductInfo();
            showRelProd();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentComment = resultObj.data;
            showProductComments();
        }
    });

    document.querySelector("#product-header button").addEventListener("click", () => {
        window.location = "products.html"
    })

    if (localStorage.getItem('articles')) {
        articles = JSON.parse(localStorage.getItem('articles'))
    }

    if (articles.some(elem => elem.id == localStorage.getItem("prodID"))) {
        divCartBtn.innerHTML = `<a class="btn btn-dark w-100 overflow-hidden" href="cart.html">Ver en el carrito</a>`
    } else {
        document.getElementById('addCart').addEventListener('click', () => {
            articles.push({
                "id": currentProduct.id,
                "name": currentProduct.name,
                "count": 1,
                "unitCost": currentProduct.cost,
                "currency": currentProduct.currency,
                "image": currentProduct.images[0]
            })
            localStorage.setItem('articles', JSON.stringify(articles));
            divCartBtn.innerHTML = `<a class="btn btn-dark w-100 overflow-hidden" href="cart.html">Ver en el carrito</a>`
        })
    }
});
