const header = document.querySelector("body");
let heroId = localStorage.getItem("currentHero");

if(heroId!=""){
    getHeroDetails(heroId);
}

async function getHeroDetails(id){
    let response = await fetch(`https://www.superheroapi.com/api.php/3410941555797031/${id}`).catch((e)=>{
        console.log("error in fetching data",e);
    });
    let data = await response.json();
    renderDetails(data);
};

function renderDetails(data){
    let bio = [];
    for (let it in data.biography) {
        bio.push(data.biography[it]);
    }
    var details = document.createElement("div");
    details.setAttribute("class","results-box");
    details.innerHTML =`
    <div class="hero-name">
            ${data.name}
        </div>
        <div class="name-stat">
            <img class="hero-image" src="${data.image.url}"/>
            <div class="power-stat">
                <ul> 
                    <li class="large">Stats</li>
                    <li class="intell marleft">Intelligence : ${data.powerstats.intelligence}</li>
                    <li class="strength marleft">Strength : ${data.powerstats.strength}</li>
                    <li class="speed marleft">Speed : ${data.powerstats.speed}</li>
                    <li class="durable marleft">Durability : ${data.powerstats.durability}</li>
                    <li class="power marleft">Power : ${data.powerstats.power}</li>
                    <li class="combat marleft">Combat : ${data.powerstats.combat}</li>
                    <li class="large">Bio</li>
                    <li class="marleft">
                        Full-Name : ${bio[0]}
                    </li>
                    <li class="marleft">
                        Place-Of-Birth : ${bio[3]}
                    </li>
                    <li class="marleft">
                        First-Appearance : ${bio[4]}
                    </li>
                    <li class="marleft">
                        Publisher : ${data.biography.publisher}
                    </li>
                    <li class="marleft">
                        Alignment : ${data.biography.alignment}
                    </li>
                </ul>
            </div>
        </div>
    `
    header.append(details);
}

// ${data.biography.place-of-birth}
// ${data.biography.first-appearance}
// ${data.biography.full-name}