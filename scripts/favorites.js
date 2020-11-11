const resultContainer = document.querySelector(".results-box");
let currentHero = "";
let favHeros = JSON.parse(localStorage.getItem("favHeros")) || [];
if (localStorage.getItem("favHeros")) {
    favHeros.map((hero) => {
    renderFavHeros(hero);
  });
}

async function renderFavHeros(id){
    let response = await fetch(`https://www.superheroapi.com/api.php/3410941555797031/${id}`).catch((e)=>{
        console.log("error in fetching data",e);
    });
    let data = await response.json();
    let heart = "";
    if(favHeros.includes(data.id)){
        heart = "fas";
    }else{
        heart = "far";
    }
    var card = document.createElement("div");
        card.setAttribute("class","hero-card");
        card.setAttribute("id",data.id);
        card.setAttribute("href","heropage.html");
        card.innerHTML =`
        <div class="hero-name">
           ${data.name}
        </div>
        <img src="${data.image.url}" class="hero-pic" alt="Ironman"/>
        <div class="mark-fav">
        <i class="${heart} fa-heart" id="${data.id}"></i>
        </div>`
        resultContainer.appendChild(card);
};

resultContainer.addEventListener("click",(e)=>{
    let hero = e.target.closest("div").id;
    if(hero!==""){
        currentHero=hero;
        localStorage.setItem("currentHero",JSON.stringify(currentHero));
        window.open("../heropage.html", "_self");
        console.log(hero);
        console.log("card clicked");
    } 

    let fav=e.target.closest("i").id;
    if(fav!==""){
        if(favHeros.includes(fav)){
          let newFav =  favHeros.filter(hero => hero!==fav);
          favHeros = newFav;
          localStorage.setItem("favHeros",JSON.stringify(favHeros));
          e.target.classList.remove("fas");
        e.target.classList.add("far");
        document.getElementById(fav).remove();
        }
    } 
    
});