import styles from './Search.module.scss';

import { FormEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { isNonNullable } from '../../utils/typeUtils';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
    loading: boolean;
    placeholder?: string;
}

const Search = ({ onSearch, placeholder, loading }: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isNonNullable(searchTerm)) {
            onSearch(searchTerm);
        }
    }

    const onChangeSearchTerm = (event: FormEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    }

    return (
        <form
            className={styles.searchContainer}
            onSubmit={handleSubmit}
        >
            <section className={styles.inputContainer}>
                <input
                    type="text"
                    name="search"
                    onChange={onChangeSearchTerm}
                    disabled={loading}
                    placeholder={placeholder || 'Type a movie search'}
                />
            </section>

            <button
                type="submit"
                title="Search"
                name="submitButton"
                disabled={!searchTerm && loading}
            >
                {/* TODO: user loading */}
                <FiSearch size={24} />
            </button>
        </form>
    );
};

export default Search;
export type { SearchProps };