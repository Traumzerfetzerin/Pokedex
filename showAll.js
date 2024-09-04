
let limit = 20;
let offset = 0;

async function fetchDataJson() { // offset = position ab dem es starten soll
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let responseAsJson = await response.json();
    return responseAsJson;
}


async function render() {
    try {
        pokemons = await fetchDataJson();
        document.getElementById('loadingBackground').style.display = "none";

        for (let i = 0; i < pokemons['results'].length; i++) {
            const element = pokemons['results'][i];

            await fetchAndSetPokeData(offset + i + 1);

            document.getElementById('content').innerHTML += HTMLcontent(i, element, species);
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
    offset = offset + 20;
    document.getElementById('loadingBackground').style.display = "inline";
    document.getElementById('content').innerHTML += render();
    document.getElementById('loadingBackground').style.display = "none";
}


function dontClose(event) {
    event.stopPropagation(); // stoppt Standardfunktionalität
}
