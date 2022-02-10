import styles from './Container.module.scss';

import { PropsWithChildren } from 'react';
import Header from '../Header/Header';


const Container = ({ children }: PropsWithChildren<{}>) => (
    <main className={styles.container}>
        <Header />
        <section className={styles.content}>
            {children}
        </section>
    </main>
);

export default Container;