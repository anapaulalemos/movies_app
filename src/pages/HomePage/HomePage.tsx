import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import Date from '../../components/Date/Date';
import Search from '../../components/Search/Search';
import Sort from '../../components/Sort/Sort';
import Movie from '../../models/Movie';
import SortingOptions from '../../models/SortingOptions';
import { getMovies, searchMovies } from '../../utils/api';
import { sentErrorNotification } from '../../utils/notification';
import { Nullable } from '../../utils/typeUtils';
import styles from './HomePage.module.scss';


const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [sortParam, setSortParam] = useState(SortingOptions['Popularity ascending'])

    const [movies, setMovies] = useState<Nullable<Movie[]>>(null);

    const fetchMovies = async (page = 1) => {
        try {
            setLoading(true);
            const { results, total_pages } = await getMovies(page, sortParam);
            setMovies(results);
            setTotalPages(total_pages);
        } catch {
            sentErrorNotification('Error when fetching movies');
            setMovies(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [sortParam]);

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
                        subtitle={<Date dateString={release_date} />}
                    />
                </Link>
            )) : (
                // TODO: no found message
                <div>No movie found</div>
            );

    const getPageCount = () => (!movies || movies.length < 20) ?
        1 :
        (totalPages < 500 ? totalPages : 500);

    const onSearchMovies = async (searchTerm: string) => {
        if (loading || !searchTerm) {
            return;
        }

        try {
            setLoading(true);
            const { results, total_results } = await searchMovies(searchTerm);
            setMovies(results);
            setTotalPages(total_results);
        } catch {
            // handle exception
        } finally {
            setLoading(false);
        }
    }

    const onSort = (queryParam: SortingOptions) => {
        //TODO: clear search term
        setSortParam(queryParam);
    }

    return (
        <Container>
            <section className={styles.searchContainer}>
                <Search
                    loading={loading}
                    onSearch={onSearchMovies}
                />
                <Sort onSort={onSort} sortBy={sortParam} />
            </section>

            {loading && <div>loading</div>}

            {!loading &&
                <>
                    <section className={styles.moviesContainer}>
                        <ul>
                            {getMoviesContent()}
                        </ul>
                    </section>

                    {movies && movies.length > 0 &&
                        // TODO: fix pagination
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={<FaArrowRight />}
                            previousLabel={<FaArrowLeft />}
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
                </>}
        </Container>
    );
}

export default HomePage;