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
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    return responseAsJson;
}


async function showCard(cries) {
    try {
        const pokemon = await fetchPokeData();
        const forms = pokemon['forms'];
        let formName = forms[0]['name'];
        let experience = pokemon['base_experience'];
        let height = pokemon['height'];

        // Erster Buchstabe groß (charAt extrahiert das erste Zeichen der Zeichenkette)
        formName = formName.charAt(0).toUpperCase() + formName.slice(1);

        let abilitiesText = '';
        for (let i = 0; i < pokemon['abilities'].length; i++) {
            const ability = pokemon['abilities'][i]['ability'];
            abilitiesText += ability['name'];
            if (i < pokemon['abilities'].length - 1) {
                abilitiesText += ", ";
            }
        }

        const sprites = pokemon['sprites'];
        const dreamWorldSprite = sprites['other']['dream_world']['front_default'];
        const legacyCry = cries['legacy'];

        document.getElementById('showBigImg').innerHTML = HTMLshowCard(legacyCry, pokemon, formName, abilitiesText, dreamWorldSprite, experience, height);
    } catch (error) {
        console.error(error);
    }
}

// HTML
function HTMLshowCard(legacyCry, pokemon, formName, abilitiesText, dreamWorldSprite, experience, height) {
    return /*HTML*/`
        <div>
            <b>#${pokemon.id} ${formName}</b><br>
            <img src="${dreamWorldSprite}" alt="${formName} Sprite"><br>
            <audio controls>
                <source src="${legacyCry}" type="audio/ogg">
            </audio><br>
        </div>
        <div>
            abilities: ${abilitiesText}<br>
        </div>
        <div>
        base experience: ${experience}<br>
        </div>
        <div>height: ${height}</div>

    `;
}

const cries = {
    "legacy": "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"
};

showCard(cries);