import { ChangeEvent } from 'react';

import SortingOptions from '../../models/SortingOptions';
import styles from './Sort.module.scss';

interface SortProps {
    onSort: (queryParam: SortingOptions) => void;
    sortBy: SortingOptions;
}

const Sort = ({ onSort, sortBy }: SortProps) => {
    const getSortOptions = () =>
        Object.entries(SortingOptions).map(([key, value]) =>
            <option key={value} value={value}>{key}</option>
        );

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onSort(e.currentTarget.value as SortingOptions);
    }

    return (
        <select
            name="filter"
            className={styles.sort}
            onChange={handleSelectChange}
            value={sortBy}
        >
            {getSortOptions()}
        </select>
    );
}

export default Sort;