const express = require("express");
const router = express.Router();

const Movie = require('../models/movies');
const Star = require('../models/celebrity')

// router.get('/movies/new', (req, res, next) => {
//     res.render('movies/new-movie')
// })

router.get('/movies/new', (req, res, next) => {
    Star
        .find()
        .then(allStars => res.render("movies/new-movie", {allStars}))
        .catch(err => console.log("error while displaying new book: ", err))
});

// always in  a post --> redirect , in aget, re.render 
// forn action, res.redirect, a href always starts with /


//to pass fields from the new movie form
router.post('/movies/create', (req, res, next) => {
    console.log("Where?")
 Movie
    .create(req.body)
    .then( newMovie => {
        console.log("success!", newMovie)
        res.redirect('/movies')      
    })
    .catch( err => console.log("Error while creating a movie:", err));
});

// to display all movies
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(moviesFromDb => res.render('movies/movies.hbs', { movies: moviesFromDb  }))
        .catch(err => console.log("Error while getting movies from DB:", err));
});


// to see movie detail page
router.get('/movies/:id' , (req, res, next) => {
    Movie   
        .findById(req.params.movieId)
        .populate('cast')
        .then(theMovie => {
            res.render("movies/movie-details", {theMovie});
        })
        .catch( err => console.log('error while getting details of the movie:', err))
})


//to delete the movie
router.post("/movies/:id/delete", (req, res, next) =>{
    Movie
        .findByIdAndRemove(req.params.theId)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log("error while deleting the movie: ", err))

})


module.exports = router;
