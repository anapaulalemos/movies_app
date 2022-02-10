import styles from './Card.module.scss';

interface CardProps {
    title: string;
    imgPath: string;
    releaseDate: string;
}

const Card = ({
    title,
    imgPath,
    releaseDate
}: CardProps) => (
    <article className={styles.card}>
        <img
            alt="Poster"
            src={`https://image.tmdb.org/t/p/original/${imgPath}`}
            width={200}
        />
        <div className={styles.footer}>
            <h3>{title}</h3>
            <span >{releaseDate}</span>
        </div>
    </article>
);

export default Card;