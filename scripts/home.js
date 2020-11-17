const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector(".input");
const resultContainer = document.querySelector(".results-box");
let currentHero = "";
let favHeros = JSON.parse(localStorage.getItem("favHeros")) || [];

resultContainer.addEventListener("click",(e)=>{
    let hero = e.target.closest("div").id;
    if(hero!==""){
        currentHero=hero;
        localStorage.setItem("currentHero",JSON.stringify(currentHero));
        window.open("heropage.html", "_self");
        console.log(hero);
        console.log("card clicked");
    }

    //chacking and adding favorite heros
    let fav=e.target.closest("i").id;
    if(fav!==""){
        if(favHeros.includes(fav)){
          let newFav =  favHeros.filter(hero => hero!==fav);
          favHeros = newFav;
          localStorage.setItem("favHeros",JSON.stringify(favHeros));
          e.target.classList.remove("fas");
        e.target.classList.add("far");
        }
        else{
            favHeros.push(fav);
            localStorage.setItem("favHeros",JSON.stringify(favHeros));
            e.target.classList.remove("far");
            e.target.classList.add("fas");
        }
        
    }  
    
});

//form submit event handler
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(searchInput.value);
    
});

//fetching hero list on every keyup event
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
    // console.log(heroList);
    // console.log(searchInput.value);
    renderResults(heroList,searchValue);
});


// rendering the hero cards in result
function renderResults(data,value){
    if(value!==searchInput.value){
        return;
    }
    resultContainer.innerHTML="";
    for(let ele of data){
        let heart = "";
        if(favHeros.includes(ele.id)){
            heart = "fas";
        }else{
            heart = "far";
        }

        var card = document.createElement("div");
        card.setAttribute("class","hero-card");
        card.setAttribute("id",ele.id);
        card.setAttribute("href","heropage.html");
        card.innerHTML =`
        <div class="hero-name">
           ${ele.name}
        </div>
        <img src="${ele.image.url}" class="hero-pic" alt="Ironman"/>
        <div class="mark-fav">
        <i class="${heart} fa-heart" id="${ele.id}"></i>
        </div>`
        resultContainer.appendChild(card);
    }
}




