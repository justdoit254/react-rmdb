import React, {useContext} from "react";
import PropTypes from "prop-types"
import API from '../../API'
// components
import Thumb from "../Thumb";
//Login
// import Rate from "../Rate";
// config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
// image
import NoImage from '../../images/no_image.jpg'
//styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";
// context (Login)
// import { Context } from "../../context";

const MovieInfo = ({movie}) => {

    // Login
    // const [user] = useContext(Content)

    // const handlingRate = async value => {
    //     const rate = await API.rateMovie(user.sessionId, movie.id, value)
    //     console.log(rate);
    // }
  
    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb 
                    image={
                        movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : NoImage
                    }
                    clickable={false}
                />    
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>
                        {/* <div className="director">
                            <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                            <h3>DIRECTOR</h3>
                            {movie.directors.map(director => (
                                <p key={director.credit_id}>{director.name}</p>
                            ))}
                        </div> */}
                        <div className="director">
                            <h3>DIRECTOR
                                {((movie.directors!==undefined) && (movie.directors.length>1)) ? 'S' : ''}
                            </h3>
                                {movie.directors && movie.directors.map(director => (
                                    <p key={director.credit_id}>{director.name}</p>
                                ))}
                        </div>
                    </div>
                    {/* Login */}
                    {/* {user && (
                        <div>
                            <p>Rate Movie</p>
                            <Rate callback={handlingRate}/>
                        </div>
                    )} */}
                </Text>
            </Content>
        </Wrapper>
    )    
}

MovieInfo.propTypes = {
    movie: PropTypes.object
}

export default MovieInfo