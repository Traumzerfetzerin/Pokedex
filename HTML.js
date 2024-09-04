
// STATS
function HTMLbaseStatsText(stat) {
    return /*HTML*/`
        <div>${stat['stat']['name']}:
            <div class="progress" role="progressbar" aria-label="${stat['stat']['name']}" aria-valuenow="${stat['base_stat']}">
                <div class="progress-bar" style="width: ${stat['base_stat']}%">${stat['base_stat']}%</div>
            </div>
        </div><br>
    `;
}


// TYPES
function HTMLtype(i) {
    return /*HTML*/`
<img src="./icon/${pokemon['types'][i]['type']['name']}.png" alt="">`
}


function HTMLcontent(limit, pokemons, i, element, species) {
    return /*HTML*/ `
    <div class="card pointer cardAllPokemons center" style="background-color:${species['color']['name']}"
        onclick="showCard(${pokemon.id})">
        <div class="flex">
            <h2><b>#${i + 1}</b> ${formName(element['name'])}</h2>
        </div>
        <div class="bgAllPokemons"><img class="imgAllPokemons" src="${changePicture()}" class="card-img-top" alt="..."></div>
        <div class="typeAll" id="typeAll${i}"></div>
    </div>`
}