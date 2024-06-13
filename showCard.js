let pokemons = [];
let limit;
let typeIcons = {
    bug: './icon/bug.png',
    dark: './icon/dark.png',
    dragon: './icon/dragon.png',
    electric: './icon/electric.png',
    fairy: './icon/fairy.png',
    fighting: './icon/fighting.png',
    fire: './icon/fire.png',
    flying: './icon/flying.png',
    ghost: './icon/ghost.png',
    grass: './icon/grass.png',
    ground: './icon/ground.png',
    ice: './icon/ice.png',
    normal: './icon/normal.png',
    poison: './icon/poison.png',
    psychic: './icon/psychic.png',
    rock: './icon/rock.png',
    sand: './icon/sand.png',
    steel: './icon/steel.png',
    water: './icon/water.png',
}

// DYNAMISCH GESTALTEN !!!
async function fetchPokeData() {
    let responsePokemon = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
    let responseSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/1/");
    
    // EVO
    let responseEvolution = await fetch("https://pokeapi.co/api/v2/evolution-chain/1/");
    let responseEvoNext = await fetch("https://pokeapi.co/api/v2/pokemon/2/");
    let responseEvoLast = await fetch("https://pokeapi.co/api/v2/pokemon/3/");

    let responsePokemonAsJson = await responsePokemon.json();
    let responseSpeciesAsJson = await responseSpecies.json();
    let responseEvolutionAsJson = await responseEvolution.json();

    // EVO
    let responseEvoNextAsJson = await responseEvoNext.json();
    let responseEvoLastAsJson = await responseEvoLast.json();

    return {
        pokemon: responsePokemonAsJson,
        species: responseSpeciesAsJson,
        evolution: responseEvolutionAsJson,
        evoNext: responseEvoNextAsJson,
        evoLast: responseEvolutionAsJson,
    };
}


async function showCard(cries) {
    // GLOBAL MÖGLICH BZW SINNVOLL ???
    try {
        let { pokemon, species } = await fetchPokeData();
        let forms = pokemon['forms'];
        let formName = forms[0]['name'];
        let experience = pokemon['base_experience'];
        let height = pokemon['height'];
        let weight = pokemon['weight'];
        let sprites = pokemon['sprites'];
        let dreamWorldSprite = sprites['other']['dream_world']['front_default'];
        let legacyCry = cries['legacy'];
        let color = species['color']['name'];
        let habitat = species['habitat']['name'];

        let flavorTextEntry = species['flavor_text_entries'].find(entry => entry.language.name === 'en' && entry.version.name === 'heartgold');
        let flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'No flavor text available';

        // FIRST LETTER LARGE (charAt extrahiert erstes Zeichen der Zeichenkette)
        formName = formName.charAt(0).toUpperCase() + formName.slice(1);

        // CLEANCODE MÖGLICH ???
        // TYPES
        let typesArray = [];
        for (let i = 0; i < pokemon['types'].length; i++) {
            typesArray.push(pokemon['types'][i]['type']['name']);
        }
        let types = typesArray.join(', ');

        document.getElementById('showBigImg').innerHTML = HTMLshowCard(legacyCry, pokemon, formName, abilitiesText, dreamWorldSprite, experience, height, weight, flavorText, color, baseStatsText, types, habitat);
    } catch (error) {
        // ERROR CONSOLE !!!
        console.error(error);
    }
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


// ABILITIES
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


// AUDIO
const cries = {
    "legacy": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"
};


showCard(cries);
