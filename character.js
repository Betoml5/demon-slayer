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
  $characterDetailsContainer.innerHTML = `<div class="loader">Cargando...</div>`;
  document.title = "Cargando...";

  try {
    const character = await getCharacter();
    const Imageurl = character[0].gallery[0];
    const image = Imageurl.split(".png")[0];
    const characterTemplate = `
            <div class="main__characters-card-details">
                <div class="main__characters-card-details-image-container">
                    <img src=${image}.png  alt="${character[0].name}" />
                </div>
                <div class="main__characters-card-details-description">
                  <p>Nombre: ${character[0].name}</p>
                  <p>Edad: ${character[0].age} </p>
                  <p>Peso: ${character[0].weight} </p>
                  <p>Altura: ${character[0].height} </p>
                  <p>Cumpleaños: ${character[0].birthday} </p>


                </div>
               
            </div>
            `;
    document.title = character[0].name;
    $characterDetailsContainer.innerHTML = characterTemplate;
  } catch (error) {
    $characterDetailsContainer.innerHTML = `<div class="error">Error al cargar el personaje</div>`;
  }
};

renderCharacter();
