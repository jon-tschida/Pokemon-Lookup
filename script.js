`use strict`;

// Selecting elements in DOM //

// Selecting main content div to hide it until user searches for pokemon
const mainContent = document.getElementById(`MainContent`);

// Selecing button and form 
const submitButton = document.querySelector(`.button`);
const input = document.querySelector(`.input-field`);

// Selecting Pokemon name heading (gives pokemon name) 
const pokemonNameHeading = document.getElementById(`pokemon-name-heading`);

// Selecting our left and right pokemon info boxes for base stats and details
const pokemonInfoLeft = document.getElementById(`pokemon-info-left`)
const pokemonInfoRight = document.getElementById(`pokemon-info-right`)

// Selecting Types container to populate the types
const typesContainer = document.querySelector(`.types-container`);

// Selecting image content and image headers
const pokemonImages = document.getElementById(`pokemon-images`);
const imgHeaders = document.getElementById(`imgHeader`);


// Selecting abilities content
const abilitiesContent = document.querySelector(`.abilites-container`)

// End Selecting Elements in DOM //



let clicked = 0;

submitButton.addEventListener(`click`, function (e) {
    e.preventDefault()
    pokemon = input.value
    pokemon = pokemon.toString().toLowerCase();
    clicked++;
    if (clicked === 1) {
        makeRequest(pokemon)
        mainContent.classList.remove(`hidden`)
    }
    // creating a 5 second delay between when the user can click submit. 
    setTimeout(() => { clicked = 0 }, 5000)
})

// capitalize function to use 
const capitalize = str => {
    str = str.replace(str[0], str[0].toUpperCase());
    return str;
}

// API request funciton, we use a XMLHttpRequst() function to carry this out. 
// Our function requests a pokemon param to use in the API request
const makeRequest = function (pokemon) {
    let data;
    let request = new XMLHttpRequest();
    request.open(
        `GET`,
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    request.send();
    request.onload = () => {
        if (request.status == 200) {
            data = JSON.parse(request.response);
            console.log(data)

            populateStats(data)
            populateBaseStats(data)
            populateImages(data)
            populateTypes(data)
            populateAbilites(data)

        } else {
            console.log(`error: ${request.status}, ${request.statusText}`);
            pokemonNameHeading.textContent = `404 Pokemon not found`

        }
    }
}

const populateStats = function (data) {
    let { name, height, weight, id, base_experience } = data;
    pokemonInfoLeft.innerHTML =
        `
        <p>Weight</p>
        <p>---</p>
        <p>${Math.trunc(weight / 4.536)} pounds</p>
        <p>Height</p>
        <p>---</p>
        <p>${Math.trunc(height * 3.937)} Inches</p>
        <p>ID</p>
        <p>---</p>
        <p>${id}</p>
        <p>XP from defeating</p>
        <p>---</p>
        <p>${base_experience} XP</p>
        
    `
    pokemonNameHeading.textContent = capitalize(name);

}

const populateBaseStats = function (data) {
    let statsContent = ``;
    data.stats.forEach((_, i) => {
        statsContent +=
            `
        <p>${capitalize(data.stats[i].stat.name)}</p>
        <p>---</p>
        <p>${data.stats[i].base_stat}</p>
        `
    })
    pokemonInfoRight.innerHTML = statsContent;
}

const populateImages = function (data) {
    pokemonImages.innerHTML =
        `
        <div class="pokemon-info-head" id="pokemon-info-left">
        <div class="images"><img src="${data.sprites.front_default}"></div>
    </div>
    <div class="pokemon-info-head" id="pokemon-info-right">
    <div class="images"><img src="${data.sprites.front_shiny}"></div>
    </div>
    `
    imgHeaders.innerHTML =
        `
        <div class="pokemon-info-head" style="margin-top: 50px;">
        <h1>Standard ${capitalize(data.name)}</h1>
    </div>
    <div class="pokemon-info-head" style="margin-top: 50px;">
        <h1>Shiny ${capitalize(data.name)}</h1>
`
}

const populateTypes = function (data) {
    let typeContent = ``;
    data.types.forEach((_, i) => {
        typeContent += `
        <p class="types ${data.types[i].type.name}">${capitalize(data.types[i].type.name)}</p>
        `
    })
    typesContainer.innerHTML = typeContent;
}

const populateAbilites = function (data) {
    let abilities = ``;
    data.abilities.forEach((_, i) => {
        abilities +=
            `
            <p class="abilites">${capitalize(data.abilities[i].ability.name)}</p> 
        `
    })
    abilitiesContent.innerHTML = abilities;
}
