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
    <article className={styles.card} title={`Go to '${title}' details`}>
        <img
            alt="Poster"
            src={`https://image.tmdb.org/t/p/original/${imgPath}`}
            width={199}
        />
        <div className={styles.footer}>
            <span className={styles.title}>{title}</span>
            <span >{releaseDate}</span>
        </div>
    </article>
);

export default Card;