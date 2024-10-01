
let limit = 20;
let offset = 0;


async function fetchDataJson() { // offset = position ab dem es starten soll
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let responseAsJson = await response.json();
    return responseAsJson;
}


async function fetchAllPokemonJson() {
    let allPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${await generateLastOne()}&offset=0`);
    let allPokemonAsJson = await allPokemon.json();
    return allPokemonAsJson;
}


async function searchPokemon(valueSearchField) {
    valueSearchField = valueSearchField.replace(/[^a-zA-Z]/g, '');
    if (valueSearchField.length > 2) {
        document.getElementById('filterPokemons').disabled = true;
        document.getElementById('loadingBackground').style.display = "inline";
        let resultsPokemon = await fetchAllPokemonJson();
        let result = resultsPokemon.results.filter(currentSearchLine =>
            currentSearchLine.name.toLowerCase().includes(valueSearchField.toLowerCase()));
        // includes(eigenständige Funktion) prüft ob das was im Suchfeld eingegeben worden ist, was im array pokemon name passt
        // 1. toLowerCase bezieht sich auf Arry, 2. toLowerCase bezieht sich auf Suchfeld

        if (result.length > 0) {
            await ifSearchTrue(result);
        }
    }
}


async function ifSearchTrue(result) {
    document.getElementById('loadingBackground').style.display = "none";
    document.getElementById('loadButton').style.display = "none";
    document.getElementById('content').innerHTML = "";
    for (let i = 0; i < result.length; i++) {
        let pokemonResults = result[i]['name'];
        await fetchAndSetPokeData(pokemonResults);
        document.getElementById('content').innerHTML += HTMLcontent(pokemon.id, pokemon, species);
        getType(`typeAll${pokemon.id}`);
        document.getElementById('filterPokemons').disabled = false;
    }
}


async function clearSearchField() {
    offset = 0;

    document.getElementById('filterPokemons').value = "";
    document.getElementById('content').innerHTML = "";
    document.getElementById('filterPokemons').disabled = false;
    document.getElementById('loadButton').style.display = "flex";
    await render();
}



async function render() {
    try {
        pokemons = await fetchDataJson();

        for (let i = 0; i < pokemons['results'].length; i++) {
            const element = pokemons['results'][i];

            let calculatedOffsetId = offset + i + 1;

            await fetchAndSetPokeData(calculatedOffsetId);

            document.getElementById('content').innerHTML += HTMLcontent(calculatedOffsetId, element, species);
            getType(`typeAll${calculatedOffsetId}`);
        }
    } catch (error) {
        console.error(error);

    } document.getElementById('loadingBackground').style.display = "none";
}


function closeCard() {
    document.getElementById('contentBig').classList.add("d-none");
    document.getElementById('dialogBackground').classList.add("d-none");
    document.getElementById('body').style.overflow = "auto";
}


async function loadMore() {
    offset = offset + 20;
    document.getElementById('loadingBackground').style.display = "inline";
    await render();
    document.getElementById('loadingBackground').style.display = "none";
}


function dontClose(event) {
    event.stopPropagation(); // stoppt Standardfunktionalität
}


