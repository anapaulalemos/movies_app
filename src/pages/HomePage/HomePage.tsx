import { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

import Container from '../../components/Container/Container';
import Movies from '../../components/Movies/Movies';
import Search from '../../components/Search/Search';
import Sort from '../../components/Sort/Sort';
import Movie from '../../models/Movie';
import SortingOptions from '../../models/SortingOptions';
import { getMovies, searchMovies } from '../../utils/api';
import { sentErrorNotification } from '../../utils/notification';
import styles from './HomePage.module.scss';


const HomePage = () => {
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortParam, setSortParam] = useState(SortingOptions['Popularity ascending'])

    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = useCallback(async (currentPage = 0) => {
        try {
            setLoading(true);
            const { results, total_pages } = await getMovies(currentPage + 1, sortParam);
            setMovies(results);
            setPage(currentPage);
            setTotalPages(total_pages);
        } catch {
            sentErrorNotification('Error when fetching movies');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, [sortParam]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies, sortParam]);


    const getPageCount = () => (!movies || movies.length < 20) ?
        1 :
        (totalPages < 500 ? totalPages : 500);

    const onSearchMovies = async (searchTerm: string) => {
        if (loading || !searchTerm) {
            return;
        }

        setPage(0);

        try {
            setLoading(true);
            const { results, total_results } = await searchMovies(searchTerm);
            setMovies(results);
            setTotalPages(total_results);
        } catch {
            sentErrorNotification('Error when searching the movies');
        } finally {
            setLoading(false);
        }
    }

    const onSort = (queryParam: SortingOptions) => {
        setSortParam(queryParam);
        setPage(0);
        setSearchTerm('');
    }

    return (
        <Container>
            <section className={styles.searchContainer}>
                <Search
                    loading={loading}
                    onSearch={onSearchMovies}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <Sort onSort={onSort} sortBy={sortParam} />
            </section>

            <section className={styles.moviesContainer}>
                <Movies
                    loading={loading}
                    movies={movies}
                />
            </section>
            {movies && movies.length > 0 &&
                <ReactPaginate
                    breakLabel="..."
                    forcePage={page}
                    nextLabel={<FaArrowRight />}
                    previousLabel={<FaArrowLeft />}
                    onPageChange={(e) => fetchMovies(e.selected)}
                    pageCount={getPageCount()}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
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