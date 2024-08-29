async function fetchDataJson(limit) { // offset = position ab dem es starten soll
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    return responseAsJson;
}


async function render(limit) {
    try {
        pokemons = await fetchDataJson(limit);
        document.getElementById('content').innerHTML = ``;
        document.getElementById('loadingBackground').style.display = "none";

        for (let i = 0; i < pokemons['results'].length; i++) {
            const element = pokemons['results'][i];
            console.log(element);

            await fetchAndSetPokeData(i + 1);

            document.getElementById('content').innerHTML += /*HTML*/ `
                <div class="card pointer cardAllPokemons" style="width: 18rem;" onclick="showCard(${pokemon.id})">
                    <div class="flex">
                        <b>#${i + 1} ${formName(element['name'])}</b>
                        <div class="typeAll" id="typeAll${i}"></div>
                    </div>
                    <img class="imgAllPokemons" src="${changePicture()}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">${changeFlavorText()}</p>
                    </div>
                </div>`;
            getType(`typeAll${i}`);
        }
    } catch (error) {
        console.error(error);
    }
}


function closeCard() {
    document.getElementById('contentBig').classList.add("d-none");
    document.getElementById('dialogBackground').classList.add("d-none");
    document.getElementById('body').style.overflow = "auto";
}