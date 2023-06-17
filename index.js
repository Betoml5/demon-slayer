const $charactersContainer = document.querySelector("#charactersContainer");

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
      const url = character.image;
      const image = url.split(".png")[0];
      return `
          <div class="main__characters-card">
              <div class="main__characters-card-image-container"main__characters-card-image-container">
                  <img src=${image}.png alt="${character.name}" />
              </div>
              <p>${character.name}</p>
              <p>Mas informacion acerca de ${character.name} <a href='${character.url}'>ver</a></p>
          </div>
          `;
    });
    $charactersContainer.innerHTML = charactersTemplate.join("");
  } catch (error) {
    $charactersContainer.innerHTML = `<div class="error">Error al cargar los personajes</div>`;
  }
};

renderCharacters();
