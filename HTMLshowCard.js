// STATS
function HTMLbaseStatsText(stat) {
    return /*HTML*/`
        <div>${stat['stat']['name']}:
            <div class="progress" role="progressbar" aria-label="${stat['stat']['name']}" aria-valuenow="${stat['base_stat']}">
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


