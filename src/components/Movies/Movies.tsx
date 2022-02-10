import { format, parseISO } from 'date-fns';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import Movie from '../../models/Movie';
import Card from '../Card/Card';
import styles from './Movies.module.scss';

interface RepositoriesInfoProps {
    loading: boolean;
    movies: Movie[];
}

const Movies = ({
    movies,
    loading
}: RepositoriesInfoProps) => {
    if (loading) {
        return <Oval color="#00ADAC" height={60} width={60} />;
    }

    const getMoviesContent = () =>
        movies &&
            movies.length > 0 ?
            movies.map(({ id, original_title, poster_path, release_date }) => (
                <Link
                    key={id}
                    to={`/movie/${id}`}
                >
                    <Card
                        title={original_title}
                        imgPath={poster_path}
                        subtitle={release_date ? format(parseISO(release_date), 'LLLL d, yyyy') : ''}
                    />
                </Link>
            )) : (
                // TODO: no found message
                <div>No movie found</div>
            );

    return (
        <ul className={styles.moviesContainer}>
            {getMoviesContent()}
        </ul>
    )
};

export default Movies;
export type {
    RepositoriesInfoProps
};