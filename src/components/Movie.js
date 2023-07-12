import React from "react";
import { useParams } from "react-router-dom";       //to get the movieId
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
//components
import BreadCrumb from "./BreadCrumb";
import Grid from "./Grid";
import Spinner from "./Spinner";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
//hook
import { useMovieFetch } from "../hooks/useMovieFetch";

// image
import NoImage from'../images/no_image.jpg'

// const Movie = () => <div>Movie</div>

const Movie = () => {
    const {movieId} = useParams(); 
    const {state:movie, loading, error} = useMovieFetch(movieId);

    // console.log(movie)
    
    if (movie.directors !== undefined) {
        console.log(movie.directors.length)     //without if statement it will showing type error
    } 
  

    if (loading) {
        return <Spinner />
    }
    if (error) {
       return  <div>Something went wrong...</div>
    }

    return (
        <>
         {/* <div>Movie</div> */}
         <BreadCrumb movieTitle={movie.original_title} />
         <MovieInfo movie={movie} />
         <MovieInfoBar 
            time={movie.runtime} 
            budget={movie.budget} 
            revenue={movie.revenue} 
        />
        <Grid header='Actors'>
            {movie.actors && movie.actors.map(actor => (
                <Actor
                    key={actor.credit_id}
                    name={actor.name}
                    character={actor.character}
                    imageUrl={
                        actor.profile_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                        : NoImage
                    }
                />
            ))}
        </Grid>
        </>
    )
}

export default Movie