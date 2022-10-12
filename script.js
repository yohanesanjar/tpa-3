const API_KEY = 'api_key=d14f80e1a9c945f21505628be7021751'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?'+API_KEY + '&sort_by=popularity.desc&page=1'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const searchURL = BASE_URL + '/search/movie?'+API_KEY

const col = document.getElementById('main')
const form = document.getElementById('form')

getMovies(API_URL)

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results)
    })
}

function showMovies(data){
    col.innerHTML = ''

    data.forEach(movie => {
        const {title, poster_path, release_date, vote_average} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('col')
        movieEl.innerHTML = `
        <div class="movie card h-100">
        <img src="${IMG_URL+poster_path}" class="card-img-top p-2" alt="${title}">
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <h5 class="card-title">${title}</h5>
            </div>
            <div class="col-3">
              <h5 class="card-text text-end"><b>${vote_average}</b></h5>
            </div>
          </div>
          <p class="card-text pt-4">${release_date}</p>
        </div>
        
        
        `

        col.appendChild(movieEl)
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm){
    getMovies(searchURL+'&query='+searchTerm+'&page=1')
  }
})