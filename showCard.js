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
    let responseEvolution = await fetch("https://pokeapi.co/api/v2/evolution-chain/1/");
    let responsePokemonAsJson = await responsePokemon.json();
    let responseSpeciesAsJson = await responseSpecies.json();
    let responseEvolutionAsJson = await responseEvolution.json();

    return {
        pokemon: responsePokemonAsJson,
        species: responseSpeciesAsJson,
        evolution: responseEvolutionAsJson,
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


// HTML
function HTMLbaseStatsText(stat) {
    return /*HTML*/`
        <div>${stat['stat']['name']}:
            <div class="progress" role="progressbar" aria-label="${stat['stat']['name']}" aria-valuenow="${stat['base_stat']}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${stat['base_stat']}%">${stat['base_stat']}%</div>
            </div>
        </div><br>
    `;
}


function HTMLshowCard(legacyCry, pokemon, formName, abilitiesText, dreamWorldSprite, experience, height, weight, flavorText, color, baseStatsText, types, habitat) {
    return /*HTML*/`

<!-- CARD -->
    <div class="card">
    <div class="IDname">
        <div># ${pokemon.id}</div>
        <div>${formName}</div><br>
        <div>${types}
            <p>Habitat: ${habitat}</p>
        </div>
        <!-- ICON STATT TEXT !!! -->
    </div>
        <img style="background-color: ${color};" src="${dreamWorldSprite}" alt="${formName} Sprite"><br>
        <div class="card-body">
            <p><b>${flavorText}</b></p>
        </div>
        <audio controls>
            <source src="${legacyCry}" type="audio/ogg">
        </audio><br>

    <!-- ACCORDION -->
    <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Basics
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div>Abilities: ${abilitiesText(pokemon)}<br></div>
                    <div>Base-Experience: ${experience}<br></div>
                    <div>Height: ${height / 100} m<br></div>
                    <div>Weight: ${weight / 100} kg<br></div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Stats
                </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    ${baseStatsText(pokemon)}
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Evolution
                </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    bla bla bla
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
}

const cries = {
    "legacy": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"
};

showCard(cries);
