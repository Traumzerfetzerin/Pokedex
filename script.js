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


async function showCard(pokemons, forms, formName, abilitiesText, sprites, dreamWorldSprite) {
    try {
        const pokemons = await fetchPokeData();
        const forms = pokemons['forms'];
        let formName = forms[0]['name'];

        // Erster Buchstabe groß
        formName = formName.charAt(0).toUpperCase() + formName.slice(1);

        let abilitiesText = '';
        for (let i = 0; i < pokemons['abilities'].length; i++) {
            const ability = pokemons['abilities'][i]['ability'];
            abilitiesText += ability['name'];
            if (i < pokemons['abilities'].length - 1) {
                abilitiesText += ", ";
            }
        }

        const sprites = pokemons['sprites'];
        const dreamWorldSprite = sprites['other']['dream_world']['front_default'];

        document.getElementById('showBigImg').innerHTML = HTMLshowCard(pokemons, forms, formName, abilitiesText, sprites, dreamWorldSprite);
    } catch (error) {
        console.error(error);
    }
}

// HTML
function HTMLshowCard(pokemons, forms, formName, abilitiesText, sprites, dreamWorldSprite) {
    return /*HTML*/`
        <div>
            <b>#${pokemons['abilities'].length} ${formName}</b><br>
            <img src="${dreamWorldSprite}" alt="${formName} Sprite"><br>
            Fähigkeiten: ${abilitiesText}
        </div>
    `;
}