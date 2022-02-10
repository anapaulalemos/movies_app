import styles from './Card.module.scss';
import NotFound from '../../assets/not_found.png';
import classnames from 'classnames';

interface CardProps {
    title: string;
    imgPath: string;
    subtitle: string | React.ReactNode;
    small?: boolean;
}

const Card = ({
    title,
    imgPath,
    subtitle,
    small = false
}: CardProps) => {
    const classNames = classnames(styles.card, {
        [styles.smallCard]: small
    })

    return (
        <article
            className={classNames}
        >
            <object data={`https://image.tmdb.org/t/p/original/${imgPath}`} width={198} type="image/jpeg">
                <div className={styles.imgNotFound}>
                    <img
                        alt="Poster"
                        src={NotFound}
                        width={198}
                    />
                </div>
            </object>

            <div className={styles.footer}>
                <span className={styles.title}>{title}</span>
                {subtitle}
            </div>
        </article >
    );
}

export default Card;