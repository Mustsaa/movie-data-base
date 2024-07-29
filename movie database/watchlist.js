document.addEventListener('DOMContentLoaded', () => {
    const watchlistDiv = document.getElementById('watchlist') 
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    
    function displayWatchlist() {
        watchlistDiv.innerHTML = ''
        watchlist.forEach((movie, index) => {
            const movieDiv = document.createElement('div')
            movieDiv.classList.add('movie')
            movieDiv.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <button onclick="removeFromWatchlist(${index})">Remove</button>
            `
            watchlistDiv.appendChild(movieDiv)
        })
    }
    
    window.removeFromWatchlist = function (index) {
        watchlist.splice(index, 1)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        displayWatchlist() 
    }

    displayWatchlist()

})
