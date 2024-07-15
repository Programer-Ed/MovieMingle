document.addEventListener('DOMContentLoaded',function(){
    const films = document.getElementById('films')
    const title = document.getElementById('title')
    const runTime = document.getElementById('runtime')
    const showTime = document.getElementById('showtime')
    const movieTickets = document.getElementById('tickets')
    const description = document.getElementById('description')
    const moviePoster = document.getElementById('poster')
    const buyTicketBtn = document.getElementById('buyTicket')

    let currentMovieId = null;
    let filmData = [];

    //fetch files from sever
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
        filmData=data;
        
        //list of movies
    filmData.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.title;
        li.classList.add('items');
        li.addEventListener('click', () => movieDetails(element));
        films.appendChild(li);
    });

    //previews the first element as a default
    if(filmData.length > 0) {
        movieDetails(filmData[0])
    }
})


//buy ticket button
buyTicketBtn.addEventListener('click', () =>{
    if (currentMovieId) {
        const selectMovie = filmData.find(element => element.id == currentMovieId);
        if (selectMovie) {
          if (selectMovie.tickets_sold < selectMovie.capacity) {
            selectMovie.tickets_sold++;
            updateMovie(selectMovie);
          } else {
            alert('Sold Out')
          }
        }
      }
    });
        // Function to update element details
        function movieDetails(element) {
            currentMovieId = element.id;
            title.textContent = element.title;
            runTime.textContent = element.runtime;
            showTime.textContent = element.showtime;
            description.textContent = element.description;
            moviePoster.src =element.poster;
            updateMovie(element)
        }
        function updateMovie(element){
            movieTickets.textContent = element.capacity - element.tickets_sold;
            buyTicketBtn.disabled = false;
            buyTicketBtn.textContent = 'Buy Ticket';
        }
})

