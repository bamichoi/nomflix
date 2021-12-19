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
    dates:{
        minimum:string;
        maximum:string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
        response => response.json()
    );
}