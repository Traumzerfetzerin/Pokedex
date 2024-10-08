
let pokemon, species;
let pokemons = [];
let typesArray = [];
let speciesURL;
let evolution;
let nextPokemon;
let lastPokemon;




async function fetchPokeData(position) {
    let responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`);
    if (position == 'squawkabilly-green-plumage') { position = '931'; }
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
        ({ pokemon, species } = await fetchPokeData(position));
    } catch (error) {
        console.error(error);
    }
}


async function showCard(position) {
    document.getElementById('loadingBackground').style.display = "inline";
    await fetchAndSetPokeData(position);
    document.getElementById('contentBig').classList.remove("d-none");
    document.getElementById('dialogBackground').classList.remove("d-none");
    document.getElementById('body').style.overflow = "hidden";
    document.getElementById('loadingBackground').style.display = "none";
    let experience = pokemon['base_experience'];
    let height = pokemon['height'];
    let weight = pokemon['weight'];
    let color = species['color']['name'];
    let flavorTextEntry = changeFlavorText();
    let flavorText = flavorTextEntry ? flavorTextEntry : 'No flavor text available';
    let upperName = formName(pokemon['forms'][0]['name']);

    await fetchEvolution();

    getAllFunctions(color, pokemon, upperName, flavorText, experience, height, weight);
}


// GET ALL FUNCTIONS
function getAllFunctions(color, pokemon, upperName, flavorText, experience, height, weight) {
    renderPicture();
    getBackgroundColor(color);
    getPokemonID(pokemon);
    getPokemonName(upperName);
    getType('typ');
    getHabitat();
    getFlavorText(flavorText);
    getAudio();
    pokemonAbilities(pokemon);
    getBaseExperience(experience);
    getHeight(height);
    getWeight(weight);
    getStats(pokemon);
    getEvolution(species);
}


// GET ID
function getPokemonID(pokemon) {
    document.getElementById('IDpokemon').innerHTML = /*HTML*/`# ${pokemon.id}`;
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
function getType(typID) {
    document.getElementById(typID).innerHTML = '';
    for (let i = 0; i < pokemon['types'].length; i++) {
        let type = HTMLtype(i);
        document.getElementById(typID).innerHTML += type;
    }
}


// GET HABITAT
function getHabitat() {
    document.getElementById('habitat').innerHTML = changeHabitat();
}


// CHANGE HABITAT
function changeHabitat() {
    let findHabitat = species?.habitat?.name;
    if (!findHabitat) {
        findHabitat = 'No habitat available';
    } return findHabitat
}


// GET PICTURE
function renderPicture() {
    if (document.getElementById('bgImg').contains(document.getElementById('pokemonPicture'))) {
        document.getElementById('pokemonPicture').src = changePicture();
    } else {
        let picture = document.createElement('img'); // erzeugt HTML-Element, in dem Fall ein Bild
        picture.src = changePicture(); // weitere Attribute anpassen wie zB statt src - width
        picture.id = 'pokemonPicture';
        document.getElementById('bgImg').appendChild(picture); // wo soll es angezeigt werden, was wird angezeigt
    }
}


// CHANGE PICUTRE
// ?. prüft ob vorhanden, wenn nicht füllt Variable mit undefined
function changePicture() {
    let otherPicture = pokemon?.sprites?.other?.dream_world?.front_default;
    if (!otherPicture) {
        otherPicture = pokemon?.sprites?.other?.home?.front_default;
    } return otherPicture;
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


// CHANGE FLAVOR TEXT
function changeFlavorText() {
    let otherText = species?.flavor_text_entries?.find(entry => entry.language.name === 'en' && entry.version.name === 'heartgold');
    if (!otherText) {
        otherText = species?.flavor_text_entries?.find(entry => entry.language.name === 'en' && entry.version.name === 'scarlet');
    } if (otherText) {
        return otherText.flavor_text;
    } else {
        return undefined;
    }
}


// GET AUDIO
function getAudio() {
    if (document.getElementById('pokemonAudio').contains(document.getElementById('pokemonCryID'))) {
        document.getElementById('pokemonCryID').src = changeAudio();
    } else {
        let pokemonCry = document.createElement('audio'); // erzeugt HTML-Element, in dem Fall eine Audio
        pokemonCry.controls = 'controls'; // weitere Attribute anpassen wie zB statt src - width
        pokemonCry.src = changeAudio();
        pokemonCry.type = 'audio/mpeg';
        pokemonCry.id = 'pokemonCryID';
        document.getElementById('pokemonAudio').appendChild(pokemonCry); // wo soll es angezeigt werden, was wird angezeigt
    }
}


// CHANGE AUDIO
function changeAudio() {
    let otherAudio = pokemon?.cries?.legacy;
    if (!otherAudio) {
        otherAudio = pokemon?.cries?.latest;
    } return otherAudio;
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
    document.getElementById('baseHeight').innerHTML = `${height / 10} m`;
}


// GET WEIGHT
function getWeight(weight) {
    document.getElementById('baseWeight').innerHTML = `${weight / 10} kg`;
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
// ?. prüft ob vorhanden, wenn nicht füllt Variable mit undefined
async function getEvolution() {
    document.getElementById('evolutionImgTemplate').innerHTML = '';
    let evolutionOne = evolution?.chain?.species?.name;
    let evolutionTwo = evolution?.chain?.evolves_to[0]?.species.name;
    let evolutionThree = evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;
    let evolutionFour = evolution?.chain?.evolves_to[0]?.evolves_to[0]?.evolves_to[0]?.species?.name;

    await generateEvolutionTemplate(evolutionOne);
    await generateEvolutionTemplate(evolutionTwo);
    await generateEvolutionTemplate(evolutionThree);
    await generateEvolutionTemplate(evolutionFour); // TEST
}


async function generateEvolutionTemplate(evolutionChain) {
    if (evolutionChain !== undefined) { // !== prüft, ob die übergebene Variable undefined ist, ansonsten passiert nichts
        await fetchAndSetPokeData(evolutionChain); // neue Daten werden geholt
        document.getElementById('evolutionImgTemplate').innerHTML += /*HTML*/ `
            <div class="pointer" onclick="showCard(${pokemon.id})">
                <img src="${changePicture()}" alt="">
                <div class="center"><b>#${pokemon.id}</b></div>
                <div class="center">${formName(evolutionChain)}</div>
            </div>`;
    }
}


// GET LAST ONE
async function generateLastOne() {
    let lastOne = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    lastOne = await lastOne.json();
    lastOne = lastOne.count - 277;
    return lastOne;
}


// TURN RIGHT AND LEFT
function getCurrentPokemonID() {
    let currentPokemonID = document.getElementById('IDpokemon').innerHTML;
    currentPokemonID = currentPokemonID.substring(2);
    return parseInt(currentPokemonID);
}


async function turnRight() {
    let nextPokemon = getCurrentPokemonID();
    if (nextPokemon >= await generateLastOne()) {
        nextPokemon = 1;
    } else {
        nextPokemon++;
    }
    showCard(nextPokemon);
}


async function turnLeft() {
    let lastPokemon = getCurrentPokemonID();
    if (lastPokemon <= 1) {
        lastPokemon = await generateLastOne()
    } else {
        lastPokemon--;
    }
    showCard(lastPokemon);
}