import Container from '../../components/Container/Containter';
import styles from './HomePage.module.scss';

const HomePage = () => (
    <Container>
        <section className={styles.searchContainer}>
            <input type="text" title="search" placeholder="search" />
            <select name="filter">
                <option>Title (A-Z)</option>
                <option>Title (Z-A)</option>
                <option>Rating descending</option>
                <option>Rating ascending</option>
            </select>
        </section>

        <br />

        <section>
            <ul className={styles.moviesContainer}>
                <li>Lista de filmes</li>
                <li>Lista de filmes</li>
                <li>Lista de filmes</li>
                <li>Lista de filmes</li>
            </ul>
        </section>

    </Container>
);

export default HomePage;