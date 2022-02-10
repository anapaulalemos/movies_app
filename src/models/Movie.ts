import { Credits } from "./Credits";
import Genre from "./Genre";

interface Movie {
    poster_path: string;
    overview: string;
    release_date: string;
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    vote_average: number;
    genres: Genre[];
    tagline: string;
    credits?: Credits;
    runtime: number;
}

export default Movie;