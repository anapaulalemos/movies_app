import { useEffect, useState } from 'react';

import Container from '../../components/Container/Container';
import Search from '../../components/Search/Search';
import Sort from '../../components/Sort/Sort';
import Movie from '../../models/Movie';
import { getMovies } from '../../utils/api';
import styles from './HomePage.module.scss';

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const { results } = await getMovies();
            setMovies(results);
        } catch {
            // TODO: handle errors
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const getMoviesContent = () =>
        movies.length > 0 &&
        movies?.map((movie) => (<li>{movie.original_title}</li>));

    if (loading) {
        return (
            <Container>
                loading...
            </Container>
        )
    }

    return (
        <Container>
            <section className={styles.searchContainer}>
                <Search />
                <Sort />
            </section>

            <br />

            <section>
                <ul className={styles.moviesContainer}>
                    {getMoviesContent()}
                </ul>
            </section>

        </Container>
    );
}

export default HomePage;