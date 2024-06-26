let pokemon, species;
let pokemons = [];
let typesArray = [];
let limit;


async function fetchPokeData(position) {
    let responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`);
    let responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${position}/`);
    let responsePokemonAsJson = await responsePokemon.json();
    let responseSpeciesAsJson = await responseSpecies.json();

    return {
        pokemon: responsePokemonAsJson,
        species: responseSpeciesAsJson
    };
}


async function fetchAndSetPokeData(position) {
    try {
        ({ pokemon, species, evolution, evoNext, evoLast } = await fetchPokeData(position));
    } catch (error) {
        console.error(error);
    }
}


async function showCard(position) {
    await fetchAndSetPokeData(position);
    let experience = pokemon['base_experience'];
    let height = pokemon['height'];
    let weight = pokemon['weight'];
    let dreamWorldSprite = pokemon['sprites']['other']['dream_world']['front_default'];
    let legacyCry = pokemon['cries']['legacy'];
    let color = species['color']['name'];
    let habitat = species['habitat']['name'];
    let flavorTextEntry = species['flavor_text_entries'].find(entry => entry.language.name === 'en' && entry.version.name === 'heartgold');
    let flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'No flavor text available';
    let upperName = formName();

    document.getElementById('showBigImg').innerHTML = HTMLshowCard(legacyCry, pokemon, upperName, dreamWorldSprite, experience, height, weight, flavorText, color, habitat);
    type();
}


// FIRST LETTER LARGE (charAt extrahiert erstes Zeichen der Zeichenkette)
function formName() {
    let formName = pokemon['forms'][0]['name'];
    return formName.charAt(0).toUpperCase() + formName.slice(1);
}


// STATS
function baseStatsText() {
    let baseStatsText = '';
    for (let i = 0; i < pokemon['stats'].length; i++) {
        let stat = pokemon['stats'][i];
        baseStatsText += HTMLbaseStatsText(stat);
    }
    return baseStatsText;
}


// ABILITIES
function abilitiesText() {
    let abilitiesText = '';
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        let ability = pokemon['abilities'][i]['ability'];
        abilitiesText += ability['name'];
        if (i < pokemon['abilities'].length - 1) {
            abilitiesText += ", ";
        }
    } return abilitiesText;
}


// TYPES
function type() {
    for (let i = 0; i < pokemon['types'].length; i++) {
        let type = HTMLtype(i);
        document.getElementById('typ').innerHTML += type;
    }
}

