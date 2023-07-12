import { useState, useEffect } from "react";
// API
import API from '../API'
// helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const[searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // console.log(searchTerm)

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false)
            setLoading(true)

            const movies = await API.fetchMovies(searchTerm, page)
            // console.log(movies)
 
            setState(prev => ({         //We are creating a new object which will take all the properties of movies and spread them here
                ...movies,
                result:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]

            }))
        } 
        catch(error) {
            setError(true)
        }
        setLoading(false)
    }

    // Initial render
    useEffect(() => {
        fetchMovies(1)
    }, [])              //empty dependency array signifies that it will only run ones when initially rendered

    // Search
    // It triggers one time on the mount and other time when the search changes
    useEffect(() => {
        // To retrieve information from sesssion storage
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState')

            if (sessionState) {
                console.log("Grabbing from session storage")
                setState(sessionState)
                return
            }
        }

        console.log("Grabbing from API")
        setState(initialState)
        fetchMovies(1, searchTerm)
    }, [searchTerm])       
    
    //Load more
    useEffect(() => {
        if (!isLoadingMore) {
            return;
        }
        fetchMovies(state.page + 1, searchTerm)
        setIsLoadingMore(false)
    }, [isLoadingMore, searchTerm, state.page])

    // Write to session storage
    useEffect(() => {
        if (!searchTerm) {
            sessionStorage.setItem('homeState', JSON.stringify(state))
        }
    }, [searchTerm, state])

    // console.log(state);

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
}