


















document.addEventListener('DOMContentLoaded',(e)=>{
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status==="ok") {
            currentCartList = resultObj.data.articles
            console.log(currentCartList)
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