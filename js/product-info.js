function showSlIndicators() {
    let slideInd='';
    for (let i = 0; i < prodImg.length; i++) {
        slideInd+=`
        <div class="col-3 p-1">    
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${i}" aria-current="true" aria-label="Slide ${i+1}" class="p-0 border-0 shadow"><img src="${prodImg[i]}" alt="" class="img-thumbnail d-block w-100"></button>
        </div>
        `;
    }
    return slideInd;
}
function showImages(){
    let imgList='';
    
    for (let i = 0; i < prodImg.length; i++) {
        imgList+=`
        <div class="carousel-item">
            <img src="${prodImg[i]}" alt="" class="d-block w-100">
        </div>
        `
    }
    return imgList;
}
function showProductInfo(){
    document.getElementById("product-header").innerHTML = `
    <h1>${currentProduct.name}</h1>
    <hr>
    `;

    document.getElementById("prod-info-container").innerHTML = `
    <div class="mt-2">
        <div class="row justify-content-center ps-3 pe-3">
            <div class="col-md-7 mb-3 shadow-lg p-3 rounded-3">    
                <div id="productCarousel" class="carousel carousel-fade" data-bs-ride="carousel">
                    
                    <div class="carousel-inner img-thumbnail">
                        ${showImages()}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="row p-3">           
                    ${showSlIndicators()}    
                </div>
            </div>
            <div class="col-md-5 ps-md-4 mb-3">
                <div class="row h-100 shadow rounded-3 justify-content-center bg-white p-4">
                    <div class="row h-100 rounded-3 justify-content-center bg-light p-3">
                        <div class="row align-content-center p-3 overflow-hidden">
                            <div class="col text-start">
                                <h5>Precio</h5>
                            </div>
                            <div class="col text-start">
                                <p>${currentProduct.currency} ${currentProduct.cost}</p>
                            </div>
                        </div>   
                        <div class="row align-content-center p-3 overflow-hidden">
                            <div class="col text-start">
                                <h5>Categoría</h5>
                            </div>
                            <div class="col text-start">
                                <p>${currentProduct.category}</p>
                            </div>
                        </div>
                        <div class="row align-content-center p-3 overflow-hidden">
                            <div class="col text-start">    
                                <h5>Cantidad de vendidos</h5>
                            </div>
                            <div class="col text-start">
                                <p>${currentProduct.soldCount}</p>
                            </div>
                        </div>
                        <div class="row align-content-center p-3 bg-white rounded-3 overflow-hidden">
                            <div class="col-12 text-center">    
                                <h4>Descripción</h4>
                            </div>
                            <hr>
                            <div class="col text-center ">
                                <p>${currentProduct.description}</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        
        </div>
    </div>
    `;
    let fstItem=document.querySelector('.carousel-item');
    let fstInd=document.querySelector('button[aria-label="Slide 1"]')
    fstItem.classList.add("active")
    fstInd.setAttribute("id","primerIndicador")
    document.querySelector('#primerIndicador').classList.add("active")
}

let calif = document.querySelector('#star');
function rate(id) {
    let star = calif.querySelectorAll('i');
    for (let i = 0; i < star.length; i++) {
        i<id ? star[i].classList.add("checked") : star[i].classList.remove("checked");
    }
}

function rateScore(score) {
    rateCmnts='';
    for (let a = 0; a < 5; a++) {
        a<score ? rateCmnts+="<i class='fa fa-star checked'></i>" : rateCmnts+="<i class='fa fa-star'></i>";
    }
    return rateCmnts;
}

function showProductComments(){
    let commentToAppend='';
    let splitDate = '';
    for (let i = 0; i < currentComment.length; i++) {
        splitDate = currentComment[i].dateTime.split(" ", 2)
        commentToAppend+=`
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
                            ${rateScore(currentComment[i].score)}
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
    document.getElementById('cmntSection').innerHTML=commentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProduct = resultObj.data;
            prodImg = currentProduct.images;
            showProductInfo();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentComment = resultObj.data;
            showProductComments();
        }
    });
});
