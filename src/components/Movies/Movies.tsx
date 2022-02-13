import { format, parseISO } from 'date-fns';
import { FaSync } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import Movie from '../../models/Movie';
import Button from '../Button/Button';
import Card from '../Card/Card';
import styles from './Movies.module.scss';

interface RepositoriesInfoProps {
    loading: boolean;
    movies: Movie[];
    onRefresh?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Movies = ({
    movies,
    loading,
    onRefresh
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
                <section className={styles.noMovies}>
                    <h2>No movies found!</h2>
                    <h4>
                        Click
                        <Button
                            type="button"
                            title="Click to refresh"
                            icon={<FaSync size={24} />}
                            onClick={onRefresh}
                        />
                        to refresh the page.
                    </h4>

                </section>
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