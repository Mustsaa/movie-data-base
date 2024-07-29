const apiKey = '82e4cff'
const searchInputEl = document.getElementById('search-input')
const resultsDiv = document.getElementById('results')

document.getElementById('form-input').addEventListener('submit', (e) => {
    e.preventDefault()
    
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInputEl.value}`)
    .then(response => response.json())
    .then(data => {
        resultsDiv.innerHTML = ''
        if(data.Search) {
            data.Search.forEach(movie => {
                const movieDiv = document.createElement('div')
                movieDiv.classList.add('movie')
                movieDiv.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <button onclick="addToWatchList('${movie.imdbID}')">Add to watchlist</button>
                `
                resultsDiv.appendChild(movieDiv)
            })
        } else {
            resultsDiv.innerHTML = '<p>Unable to find what you’re looking for. Please try another search.</p>'
        }
    })
})

function addToWatchList(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    .then(response => response.json())
    .then(movie => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
        watchlist.push(movie)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        alert(`${movie.Title} added to watchlist!`)
                 
    })
}