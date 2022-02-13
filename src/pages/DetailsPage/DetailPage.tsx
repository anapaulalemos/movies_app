import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { FaCalendar, FaClock, FaLanguage } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';

import NotFound from '../../assets/not_found.png';
import Card from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import { Credits } from '../../models/Credits';
import Movie from '../../models/Movie';
import { createGuestSessionId, getMovieCredits, getMovieDetail, getMovieRecommendations, rateMovie } from '../../utils/api';
import { sentErrorNotification, sentSuccessNotification } from '../../utils/notification';
import { isNonNullable, Nullable } from '../../utils/typeUtils';
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const [movie, setMovie] = useState<Nullable<Movie>>(null);
    const [recommendations, setRecommendations] = useState<Nullable<Movie[]>>(null)

    const fetchMovie = useCallback(async () => {
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
            setRecommendations([]);
            sentErrorNotification('Error when fetching movies');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchMovie();
    }, [id, fetchMovie]);

    const onRateMovie = async (rate: number) => {
        try {
            const { guest_session_id } = await createGuestSessionId();
            await rateMovie(movie!.id, rate * 2, guest_session_id);

            sentSuccessNotification('Movie successfully rated!');
        } catch {
            sentErrorNotification('Error when rating this movie!');
        }
    }

    const getDirectors = () => {
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
            return movie.credits?.cast.map(({ id, character, name, profile_path }) =>
                <Card
                    key={id}
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
            {loading ?
                <section className={styles.loading}>
                    <Oval color="#00ADAC" height={60} width={60} />
                </section>
                :
                movie &&
                <>
                    <header className={styles.header}>
                        <section className={styles.imgContainer}>
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
                            <h4>Rate this movie!</h4>
                            <ReactStars
                                count={5}
                                size={24}
                                color2={'#ffd700'}
                                onChange={onRateMovie}
                            />
                        </section>

                        <section>
                            <h1>{movie.title}</h1>
                            <h4>
                                <span title="Release date">
                                    <FaCalendar />
                                    &nbsp;
                                    {movie.release_date ? format(parseISO(movie.release_date), 'LLLL d, yyyy') : ''}
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

                            <div className={styles.rating} title="Rating">
                                {movie.vote_average}
                            </div>

                            <em>{movie.tagline}</em>

                            <h3>Overview</h3>
                            <span>{movie.overview}</span>

                            <br />
                            {getDirectors()}
                            <br />


                        </section>

                    </header>

                    <section className={styles.section}>
                        <h2>Cast</h2>
                        <div className={styles.items}>
                            {getCast()}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2> Movie recommendations</h2>
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