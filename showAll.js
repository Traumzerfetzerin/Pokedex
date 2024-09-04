
let limit = 20;

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

            await fetchAndSetPokeData(i + 1);

            document.getElementById('content').innerHTML += HTMLcontent(limit, pokemons, i, element, species);
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


async function loadMore() {
    limit = limit + 20;
    document.getElementById('loadingBackground').style.display = "inline";
    document.getElementById('content').innerHTML += render(limit);
    document.getElementById('loadingBackground').style.display = "none";
}

