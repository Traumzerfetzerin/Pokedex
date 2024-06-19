// STATS
function HTMLbaseStatsText(stat) {
    return /*HTML*/`
        <div>${stat['stat']['name']}:
            <div class="progress" role="progressbar" aria-label="${stat['stat']['name']}" aria-valuenow="${stat['base_stat']}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${stat['base_stat']}%">${stat['base_stat']}%</div>
            </div>
        </div><br>
    `;
}


// TYPES
function HTMLtype(i) {
    return /*HTML*/`
<img src="./icon/${pokemon['types'][i]['type']['name']}.png" alt="">`
}


function HTMLshowCard(legacyCry, pokemon, formName, dreamWorldSprite, experience, height, weight, flavorText, color, habitat) {
    return /*HTML*/`

<!-- CARD -->
<div class="card">
    <div class="IDname">
        <div># ${pokemon.id}</div>
        <div>${formName}</div><br>
        <div>
            <div id="typ"></div>
            <div>
                <p>Habitat: ${habitat}</p>
            </div>
        </div>
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
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Abilities:</td>
                            <td>${abilitiesText(pokemon)}</td>
                        </tr>
                        <tr>
                            <td>Base-Experience:</td>
                            <td>${experience}</td>
                        </tr>
                        <tr>
                            <td>Height:</td>
                            <td>${height / 100} m</td>
                        </tr>
                        <tr>
                            <td>Weight:</td>
                            <td>${weight / 100} kg</td>
                        </tr>
                    </tbody>
                </table>
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
    `;
}

