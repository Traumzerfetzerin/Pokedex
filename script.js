let pokemons = [];
let limit;

async function fetchDataJson(limit) { // offset = position ab dem es starten soll
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    return responseAsJson;
}


function loadNext(limit) {
    render(limit);
}


async function render(limit) {
    try {
        pokemons = await fetchDataJson(limit);
        document.getElementById('content').innerHTML = ``;

        for (let i = 0; i < pokemons['results'].length; i++) {
            const element = pokemons['results'][i];
            console.log(element);
            document.getElementById('content').innerHTML += /*HTML*/`
                <div>
                <b>#${i + 1} ${element['name']}</b><br>
                </div>
                <br>
            `;
        }
        limit += 5;
        document.getElementById('button').innerHTML = `
        <button onclick="loadNext(${limit})">NEXT</button>`;
    } catch (error) {
        console.error(error);
    }
}


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

        let flavorTextEntry = species['flavor_text_entries'].find(entry => entry.language.name === 'en' && entry.version.name === 'heartgold');
        let flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'No flavor text available';

        // Erster Buchstabe groß (charAt extrahiert das erste Zeichen der Zeichenkette)
        formName = formName.charAt(0).toUpperCase() + formName.slice(1);

        let abilitiesText = '';
        for (let i = 0; i < pokemon['abilities'].length; i++) {
            let ability = pokemon['abilities'][i]['ability'];
            abilitiesText += ability['name'];
            if (i < pokemon['abilities'].length - 1) {
                abilitiesText += ", ";
            }
        }

        document.getElementById('showBigImg').innerHTML = HTMLshowCard(legacyCry, pokemon, formName, abilitiesText, dreamWorldSprite, experience, height, weight, flavorText, color);
    } catch (error) {
        console.error(error);
    }
}

// HTML
function HTMLshowCard(legacyCry, pokemon, formName, abilitiesText, dreamWorldSprite, experience, height, weight, flavorText, color) {
    return /*HTML*/`

<!-- CARD -->
    <div class="card" >
            <b>#${pokemon.id} ${formName} // TYPE IMG ???</b><br>
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
        Basic
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <div>Abilities: ${abilitiesText}<br></div>
        <div>Base Experience: ${experience}<br></div>
        <div>Height: ${height}<br></div>
        <div>Weight: ${weight}<br></div>
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
        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.
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
        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
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