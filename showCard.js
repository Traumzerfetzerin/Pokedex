// // ÜBER DIE TASTATUR STEUERN 
// document.addEventListener('keydown', function (event) {
//     if (event.key === 'ArrowLeft') {
//         turnLeft();
//     } else if (event.key === 'ArrowRight') {
//         turnRight();
//     } else if (event.key === 'Escape') {
//         backToScreen();
//     }
// });


let pokemon, species;
let pokemons = [];
let typesArray = [];
let limit;
let speciesURL;
let evolution;


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
    let upperName = formName(pokemon['forms'][0]['name']);

    await fetchEvolution();

    getAllFunctions(dreamWorldSprite, color, pokemon, upperName, habitat, flavorText, legacyCry, experience, height, weight)
}


// GET ALL FUNCTIONS
function getAllFunctions(dreamWorldSprite, color, pokemon, upperName, habitat, flavorText, legacyCry, experience, height, weight) {
    getPicture(dreamWorldSprite);
    getBackgroundColor(color);
    getPokemonID(pokemon);
    getPokemonName(upperName);
    getType();
    getHabitat(habitat);
    getFlavorText(flavorText);
    getAudio(legacyCry);
    pokemonAbilities(pokemon);
    getBaseExperience(experience);
    getHeight(height);
    getWeight(weight);
    getStats(pokemon);
    getEvolution(species);
}


// GET ID
function getPokemonID(pokemon) {
    document.getElementById('IDpokemon').innerHTML += pokemon.id;
    document.getElementById('IDpokemon').style.fontWeight = "bold";
}


// GET NAME
function getPokemonName(upperName) {
    document.getElementById('pokemonName').innerHTML = upperName;
}


// FIRST LETTER LARGE (charAt extrahiert erstes Zeichen der Zeichenkette)
function formName(formName) {
    return formName.charAt(0).toUpperCase() + formName.slice(1);
}


// GET TYPES
function getType() {
    for (let i = 0; i < pokemon['types'].length; i++) {
        let type = HTMLtype(i);
        document.getElementById('typ').innerHTML += type;
    }
}


// GET HABITAT
function getHabitat(habitat) {
    document.getElementById('habitat').innerHTML += habitat;
}


// GET PICTURE
function getPicture(dreamWorldSprite) {
    let picture = document.createElement('img'); // erzeugt HTML-Element, in dem Fall ein Bild
    picture.src = dreamWorldSprite; // weitere Attribute anpassen wie zB statt src - width
    document.getElementById('bgImg').appendChild(picture); // wo soll es angezeigt werden, was wird angezeigt
}


// GET BACKGROUND-COLOR
function getBackgroundColor(color) {
    document.getElementById('bgImg').style.backgroundColor = color;
}


// GET FLAVOR TEXT
function getFlavorText(flavorText) {
    document.getElementById('flavorText').innerHTML = flavorText;
    document.getElementById('flavorText').style.fontWeight = "bold";
}


// GET AUDIO
function getAudio(legacyCry) {
    let pokemonCry = document.createElement('audio'); // erzeugt HTML-Element, in dem Fall eine Audio
    pokemonCry.controls = 'controls'; // weitere Attribute anpassen wie zB statt src - width
    pokemonCry.src = legacyCry;
    pokemonCry.type = 'audio/mpeg';
    document.getElementById('pokemonAudio').appendChild(pokemonCry); // wo soll es angezeigt werden, was wird angezeigt
}


// BASICS
function abilitiesText(pokemon) {
    let abilitiesText = '';
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        let ability = pokemon['abilities'][i]['ability'];
        abilitiesText += ability['name'];
        if (i < pokemon['abilities'].length - 1) {
            abilitiesText += ", ";
        }
    } return abilitiesText;
}


// GET ABILITIES
function pokemonAbilities(pokemon) {
    document.getElementById('BaseAbilities').innerHTML = abilitiesText(pokemon);
}


// GET EXPERIENCE
function getBaseExperience(experience) {
    document.getElementById('baseExperience').innerHTML = experience;
}


// GET HEIGHT
function getHeight(height) {
    document.getElementById('baseHeight').innerHTML = `${height / 100} m`;
}


// GET WEIGHT
function getWeight(weight) {
    document.getElementById('baseWeight').innerHTML = `${weight / 100} m`;
}


// STATS
function baseStatsText(pokemon) {
    let baseStatsText = '';
    for (let i = 0; i < pokemon['stats'].length; i++) {
        let stat = pokemon['stats'][i];
        baseStatsText += HTMLbaseStatsText(stat);
    }
    return baseStatsText;
}


// GET STATS
function getStats(pokemon) {
    document.getElementById('baseStats').innerHTML = baseStatsText(pokemon);
}


// GET SPECIES-URL
function getSpeciesURL() {
    speciesURL = species['evolution_chain']['url'];
    return speciesURL;
}


async function fetchEvolution() {
    try {
        let responseSpeciesEvolution = await fetch(getSpeciesURL());
        let responseSpeciesEvolutionAsJson = await responseSpeciesEvolution.json();
        evolution = responseSpeciesEvolutionAsJson
    } catch (error) {
        console.error(error);
    }
}


// GET EVOLUTION
async function getEvolution() {
    let evolutionOne = evolution.chain.species.name;
    let evolutionTwo = evolution.chain.evolves_to[0].species.name;
    let evolutionThree = evolution.chain.evolves_to[0].evolves_to[0].species.name;
    document.getElementById('evolutionImgTemplate').innerHTML += /*HTML*/`
        <div class="column center"><img src="${pokemon['sprites']['other']['dream_world']['front_default']}" alt="">
        <div>${formName(evolutionOne)}</div></div>`
    await fetchAndSetPokeData(evolutionTwo);


    if (evolutionTwo !== undefined) { // !== - verneint
        document.getElementById('evolutionImgTemplate').innerHTML += /*HTML*/`
        <div class="column center"><img src="${pokemon['sprites']['other']['dream_world']['front_default']}" alt="">
        <div>${formName(evolutionTwo)}</div></div>`
    } await fetchAndSetPokeData(evolutionThree);

    
    if (evolutionThree !== undefined) { // !== - verneint
        document.getElementById('evolutionImgTemplate').innerHTML += /*HTML*/`
        <div class="column center"><img src="${pokemon['sprites']['other']['dream_world']['front_default']}" alt="">
        <div>${formName(evolutionThree)}</div></div>`
    }
} 

