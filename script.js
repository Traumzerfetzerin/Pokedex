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
            document.getElementById('content').innerHTML += `
                <div>
                    Name: ${element['name']} <br>
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


async function fetchDataJson2() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    return responseAsJson;
}


async function render2() {
    try {
        pokemons = await fetchDataJson2();
        for (let i = 0; i < pokemons['abilities'].length; i++) {
            const element = pokemons['abilities'][i]['ability'];
            console.log(element);
            document.getElementById('content').innerHTML += `
                <div>
                    Name: ${element['name']} <br>
                </div>
                <br>
            `;
        }
    } catch (error) {
        console.error(error);
    }
}