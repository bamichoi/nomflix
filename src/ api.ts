const API_KEY = "26486466cbbc5e07b1dcb72c00c87e70";
const BASE_URL = "https://api.themoviedb.org/3"

interface IMovie {
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    id: number;
}
export interface IGetMoviesResult {
    results: IMovie[];
}

export function getMovies() {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
        response => response.json()
    );
}

export function getTopRatedMovies() {
    return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(
        response => response.json()
    );
}

export function getUpcomingMovies() {
    return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then(
        response => response.json()
    );
}

interface ITv {
    backdrop_path: string;
    poster_path: string;
    name: string;
    overview: string;
    id: number;
}
export interface IGetTvResult {
    results: ITv[];
}

export function getTv() {
    return fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`).then(
        response => response.json()
    );
}

export function getTopRatedTv() {
    return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(
        response => response.json()
    );
}

export function getPopularTv() {
    return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`).then(
        response => response.json()
    );
}





export function searchMovie(keyword:string|null) {
    return fetch(`${BASE_URL}/search/movie?query=${keyword}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`).then(
        response => response.json()
    );
}

export function searchTv(keyword:string|null) {
    return fetch(`${BASE_URL}/search/tv?query=${keyword}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`).then(
        response => response.json()
    );
}


