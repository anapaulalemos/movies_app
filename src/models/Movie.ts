import { Credits } from "./Credits";
import Genre from "./Genre";

interface Movie {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    original_language: string;
    original_title: string;
    tagline: string;
    title: string;
    genres: Genre[];
    credits?: Credits;
}

export default Movie;