import { useEffect, useState } from 'react';
import { FaCalendar, FaClock, FaLanguage } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import NotFound from '../../assets/not_found.png';
import Card from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import Date from '../../components/Date/Date';
import { Credits } from '../../models/Credits';
import Movie from '../../models/Movie';
import { getMovieCredits, getMovieDetail, getMovieRecommendations } from '../../utils/api';
import { isNonNullable, Nullable } from '../../utils/typeUtils';
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const [movie, setMovie] = useState<Nullable<Movie>>(null);
    const [recommendations, setRecommendations] = useState<Nullable<Movie[]>>(null)

    const fetchMovie = async () => {
        setLoading(true);

        try {
            const moviesFetched: Movie = await getMovieDetail(id!);
            const credits: Credits = await getMovieCredits(id!);
            const { results } = await getMovieRecommendations(id!);

            setMovie({
                ...moviesFetched,
                credits
            });

            setRecommendations(results);
        } catch {
            // TODO: handle error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const getCrew = () => {
        if (isNonNullable(movie)) {
            const directors = movie.credits?.crew.filter((crew) =>
                crew.job === 'Director'
            );

            const directorsString = directors
                ?.map(({ name }) => name)
                .join(', ');

            return <>
                <h4>Director(s)</h4>
                {directorsString}
            </>
        }
    };

    const getCast = () => {
        if (isNonNullable(movie)) {
            return movie.credits?.cast.map(({ character, name, profile_path }) =>
                <Card
                    key={character}
                    title={name}
                    imgPath={profile_path}
                    subtitle={character}
                    small={true}
                />
            );
        }
    }

    const getRecommendations = () =>
        isNonNullable(recommendations) && recommendations?.map(({ title, poster_path, id }) =>
            <Card
                key={id}
                title={title}
                imgPath={poster_path}
                small={true}
            />
        );

    return (
        <Container>
            {movie &&
                <>
                    <header className={styles.header}>
                        <object
                            data={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            width={199}
                            type="image/jpeg">
                            <div className={styles.imgNotFound}>
                                <img
                                    alt="Poster"
                                    src={NotFound}
                                    width={199}
                                />
                            </div>
                        </object>

                        <section>
                            <h1>{movie.title}</h1>
                            <h4>
                                <span title="Release date">
                                    <FaCalendar />
                                    &nbsp;<Date dateString={movie.release_date!} />
                                </span>
                                &nbsp; | &nbsp;
                                <span title="Language">
                                    <FaLanguage />
                                    &nbsp;{movie.original_language}
                                </span>
                                &nbsp; | &nbsp;
                                <span title="Runtime">
                                    <FaClock />
                                    &nbsp;{movie.runtime} minutes
                                </span>
                            </h4>

                            <em>{movie.tagline}</em>

                            <h3>Overview</h3>
                            <span>{movie.overview}</span>

                            <br />
                            {getCrew()}
                        </section>

                    </header>

                    <section className={styles.section}>
                        <h2>Cast</h2>
                        <div className={styles.items}>
                            {getCast()}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Recommendations</h2>
                        <div className={styles.items}>
                            {getRecommendations()}
                        </div>
                    </section>
                </>
            }
        </Container>
    )

    //cast, rating, similar movies, etc.
};

export default DetailsPage;