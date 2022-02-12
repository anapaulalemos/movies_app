import classnames from 'classnames';

import NotFound from '../../assets/not_found.png';
import styles from './Card.module.scss';

interface CardProps {
    title: string;
    imgPath: string;
    subtitle?: string;
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
            <div
                className={styles.placeholder}
                style={{
                    height: small ? '194px' : '298px',
                    width: small ? '130px' : '198px'
                }}
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
            </div>

            <div className={styles.footer}>
                <span
                    className={styles.title}
                    title={title}
                >
                    {title}
                </span>
                <span title={subtitle}>{subtitle}</span>
            </div>
        </article >
    );
}

export default Card;