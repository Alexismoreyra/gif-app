document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  if (query) {
      addToSearchHistory(query); //Crea una nueva opción en el datalist con el valor de la búsqueda realizada
      searchGIFs(query);
  }
});

function addToSearchHistory(query) {
  const datalist = document.getElementById('search-history');
  let option = document.createElement('option');
  option.value = query;
  datalist.appendChild(option);
  document.getElementById('search-input').value = ''; //Se borra el campo de entrada
}

async function searchGIFs(query) {
  const apiKey = 'OyiGhJXvOaD99Frbtftfk4BPeN3Nxj6h';
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=6&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

  try {
      const response = await fetch(url);
      const result = await response.json();
      displayGIFs(result.data);
  } catch (error) {
      console.error('Error al buscar GIFs:', error);
  }
}

function displayGIFs(gifs) {
  const gifContainer = document.getElementById('gif-container');
  gifContainer.innerHTML = '';

  gifs.forEach(gif => {
      const gifItem = document.createElement('div');
      gifItem.classList.add('gif-item');

      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;

      gifItem.appendChild(img);
      gifContainer.appendChild(gifItem);
  });
}

// Búsqueda inicial al cargar la página
searchGIFs('futbol');
