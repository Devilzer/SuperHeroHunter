const heroCard = document.querySelector(".hero-card");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector(".input");
const resultContainer = document.querySelector(".results-box");
let currentHero = "";

heroCard.addEventListener("click",()=>{
    console.log("card clicked");
})

//form submit event handler
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(searchInput.value);
    
});


searchInput.addEventListener("keyup",async()=>{
    
    let searchValue = searchInput.value;
    if(searchValue == ""){
        resultContainer.innerHTML = "";
        return;
    }
    let response = await fetch(`https://www.superheroapi.com/api.php/3410941555797031/search/${searchValue}`).catch((e)=>{
        console.log("error in fetching data",e);
    });
    let data = await response.json();
    let heroList = data.results;
    console.log(heroList);
    console.log(searchInput.value);
    renderResults(heroList,searchValue);
});


function renderResults(data,value){
    if(value!==searchInput.value){
        return;
    }
    resultContainer.innerHTML="";
    for(let ele of data){
        var card = document.createElement("div");
        card.setAttribute("class","hero-card");
        card.setAttribute("id",ele.id);
        card.innerHTML =`
        <div class="hero-name">
           ${ele.name}
        </div>
        <img src="${ele.image.url}" class="hero-pic" alt="Ironman"/>
        <div class="mark-fav">
        <i class="far fa-heart"></i>
        </div>`
        resultContainer.appendChild(card);
    }
}


