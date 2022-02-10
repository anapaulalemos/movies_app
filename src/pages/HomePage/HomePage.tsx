import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import Card from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import Search from '../../components/Search/Search';
import Sort from '../../components/Sort/Sort';
import Movie from '../../models/Movie';
import { getMovies } from '../../utils/api';
import { Nullable } from '../../utils/typeUtils';
import styles from './HomePage.module.scss';


const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<Nullable<Movie[]>>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovies = async (page = 1) => {
        try {
            setLoading(true);
            const { results, total_pages } = await getMovies(page);
            setPage(page);
            setMovies(results);
            setTotalPages(total_pages);
        } catch {
            // sentErrorNotification('Repos not found!');
            // navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const getMoviesContent = () =>
        movies &&
        movies.length > 0 &&
        movies.map(({ id, original_title, poster_path, release_date }) => (
            <Link
                key={id}
                to={`/movie/${id}`}
            >
                <Card
                    title={original_title}
                    imgPath={poster_path}
                    releaseDate={release_date}
                />
            </Link>
        ));

    const getPageCount = () => (!movies || movies.length < 20) ?
        1 :
        (totalPages < 500 ? totalPages : 500);


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

            <section className={styles.moviesContainer}>
                <ul>
                    {getMoviesContent()}
                </ul>
            </section>

            {movies &&
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FiArrowRight />}
                    previousLabel={<FiArrowLeft />}
                    onPageChange={(e) => fetchMovies(e.selected + 1)}
                    pageCount={getPageCount()}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={3}
                    containerClassName={styles.pagination}
                    pageClassName={styles.pageItem}
                    pageLinkClassName={styles.pageLink}
                    previousClassName={styles.pageItem}
                    previousLinkClassName={styles.pageLink}
                    nextClassName={styles.pageItem}
                    nextLinkClassName={styles.pageLink}
                    activeClassName={styles.active}
                    breakClassName={styles.pageItem}
                    breakLinkClassName={styles.pageLink}
                />
            }
        </Container>
    );
}

export default HomePage;