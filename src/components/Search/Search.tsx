import styles from './Search.module.scss';

import { Dispatch, FormEvent, SetStateAction } from 'react';
import { FaSearch } from 'react-icons/fa';
import { isNonNullable } from '../../utils/typeUtils';

interface SearchProps {
    onSearch: (searchTerm: string) => void;
    loading: boolean;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    placeholder?: string;
}

const Search = ({
    onSearch,
    placeholder,
    loading,
    searchTerm,
    setSearchTerm
}: SearchProps) => {
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
                    value={searchTerm}
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
                <FaSearch size={24} />
            </button>
        </form>
    );
};

export default Search;
export type { SearchProps };