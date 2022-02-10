import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './Header.module.scss';

const Header = () => (
    <header className={styles.header}>
        <Link to="/" title="Go to home">
            <Logo className={styles.logo} />
        </Link>

        <nav>
            <Link to="/stats">Statistics</Link>
        </nav>
    </header>
);

export default Header;