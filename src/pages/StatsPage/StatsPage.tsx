import { useCallback, useEffect, useState } from 'react';

import BarChart from '../../components/Charts/BarChart';
import Container from '../../components/Container/Container';
import Movie from '../../models/Movie';
import SortingOptions from '../../models/SortingOptions';
import { getMovies } from '../../utils/api';
import { sentErrorNotification } from '../../utils/notification';
import { Nullable } from '../../utils/typeUtils';

import styles from './StatsPage.module.scss';

const StatsPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<Nullable<Movie[]>>(null);

    const fetchMovies = useCallback(async (currentPage = 0) => {
        try {
            setLoading(true);
            const { results, total_pages } = await getMovies(1, SortingOptions['Rating descending']);
            setMovies(results);
        } catch {
            sentErrorNotification('Error when fetching movies');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const getBarChart = () => {
        const data: any[] = [];
        const labels: Nullable<string[]> = [];

        movies?.slice(0, 10).forEach(({ title }, index) => {
            data.push(1 + index);
            labels.push(title);
        });

        const datasets = {
            labels,
            datasets: [
                {
                    label: 'Top rated movies',
                    data: data,
                    backgroundColor: '#032541',
                }
            ],
        };

        return <BarChart datasets={datasets} />;
    };


    return (
        <Container>
            <div className={styles.chartContainer}>
                <section className={styles.chart}>
                    <h1>Top 10 rated movies</h1>
                    {getBarChart()}
                </section>
            </div>
        </Container>
    )
};

export default StatsPage;