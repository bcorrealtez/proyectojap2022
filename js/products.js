const catID=localStorage.getItem('catID')

let currentProductsArray = [];
console.log(catID)


function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProductsList(){
    document.getElementById("list-header").innerHTML = `
    <h1>${currentProductsArray.catName}</h1>
    <hr>
    <p class="text-muted">Listado de productos de la categoría "${currentProductsArray.catName}"</p>
    `;
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.products.length; i++){
        let product = currentProductsArray.products[i];

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            console.log(currentProductsArray)
            showProductsList()
        }
    });
});