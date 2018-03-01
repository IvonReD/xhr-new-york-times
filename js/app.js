/* ++++++ traemos los elementos que usaremos y creamos un let sin asignarle valor por el momento +++++ */
const form = document.getElementById("search-form");
const searchField = document.getElementById("search-keyword");
const responseContainer = document.getElementById("response-container");
let searchedForText;


/* ++++++ agregamos el evento submit y las instrucciones a ejecutar +++++ */
form.addEventListener('submit', function (e){
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
});


/* ++++++  invocando la función getNews() y es en esta función donde crearemos las peticiones +++++ */
function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9c292ebf694e4a609c485f3a406cf7ae`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
}


/* ++++++  La función handleError() +++++ */
function handleError() {
    console.log('Se ha presentado un error');
}


/* ++++++  La función  addNews( ) muestra 5 articulos en pantalla+++++ */
function addNews() {
    const data = JSON.parse(this.responseText);
    const response = data.response;
    const arryArticle = data.response.docs;
   
    arryArticle.map(function(article, index){
        if (index < 5){
            const title = article.headline.main;
            const snippet = article.snippet;
            let li = document.createElement('li');
            li.className = 'articleClass';
            li.innerText = snippet;
            
           responseContainer.appendChild(li);
        }
    })
}




/* ++++++  La función  addNews( ) muestra solo un articulo en pantalla+++++ */
// function addNews() {
//     const data = JSON.parse(this.responseText);
//     const response = data.response;
//     const article = data.response.docs [0];
//     const title = article.headline.main;
//     const snippet = article.snippet;

//     let li = document.createElement('li');
//     li.className = 'articleClass';
//     li.innerText = snippet;
    
//    responseContainer.appendChild(li);
// }