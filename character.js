const params = new URLSearchParams(window.location.search);
const characterUrl = params.get("url");
const $characterDetailsContainer = document.querySelector("#characterDetails");

const getCharacter = async () => {
  try {
    const response = await fetch(characterUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const renderCharacter = async () => {
  console.log("llamada");
  //   const $characterContainer = document.querySelector("#characterContainer");
  $characterDetailsContainer.innerHTML = `<div class="loader">Cargando...</div>`;
  document.title = "Cargando...";
  try {
    const character = await getCharacter();
    const characterTemplate = `
            <div class="main__characters-card">
                <div class="main__characters-card-image-container"main__characters-card-image-container">
                    <img src=${character[0].image} alt="${character[0].name}" />
                </div>
                <p>${character[0].name}</p>
                <p>${character[0].description}</p>
            </div>
            `;
    document.title = character[0].name;
    $characterDetailsContainer.innerHTML = characterTemplate;
  } catch (error) {
    console.log(error);
    $characterDetailsContainer.innerHTML = `<div class="error">Error al cargar el personaje</div>`;
  }
};

renderCharacter();
