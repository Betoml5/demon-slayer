const $charactersContainer = document.querySelector("#charactersContainer");
const $menu = document.querySelector("#menu");
const $btnMenu = document.querySelector("#btn-menu");

$btnMenu.addEventListener("click", () => {
  $menu.classList.toggle("show-menu");
});

const getCharacters = async () => {
  const response = await fetch(
    "https://demon-slayer-api.onrender.com/v1?limit=12"
  );
  const data = await response.json();
  return data;
};

const renderCharacters = async () => {
  $charactersContainer.innerHTML = `<div class="loader">Cargando...</div>`;

  try {
    const characters = await getCharacters();
    const charactersTemplate = characters.map((character) => {
      const Imageurl = character.image;
      const image = Imageurl.split(".png")[0];
      const characterDetailsUrl = `character-details.html?url=${character.url}`; // Agrega un parámetro "id" con el valor del ID del personaje
      return `
          <div class="main__characters-card">
              <div class="main__characters-card-image-container"main__characters-card-image-container">
                  <img src=${image}.png alt="${character.name}" />
              </div>
              <p>${character.name}</p>
              <p>Mas informacion acerca de ${character.name} <a href="${characterDetailsUrl}">ver</a></p>
          </div>
          `;
    });
    $charactersContainer.innerHTML = charactersTemplate.join("");
  } catch (error) {
    $charactersContainer.innerHTML = `<div class="error">Error al cargar los personajes</div>`;
  }
};

renderCharacters();
