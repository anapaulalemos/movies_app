const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_API_TOKEN;

const getMovies = async (page: number, sortParam: string) => {
    const params: Record<string, any> = {
        'page': page,
        'sort_by': sortParam
    };

    const url = `${baseUrl}discover/movie`;
    return await fetchGet(url, params);
}

const getMovieDetail = async (id: string) => {
    const url = `${baseUrl}movie/${id}}`;
    return await fetchGet(url);
}

const getMovieCredits = async (id: string) => {
    const url = `${baseUrl}movie/${id}/credits`;
    return await fetchGet(url);
}

const getMovieRecommendations = async (id: string) => {
    const url = `${baseUrl}movie/${id}/recommendations`;
    return await fetchGet(url);
}

const searchMovies = async (query: string) => {
    const params: Record<string, any> = {
        'query': query
    };

    const url = `${baseUrl}search/movie`;
    return await fetchGet(url, params);
}

const fetchGet = async (url: string, params?: Record<string, any>) => {
    const queryParams: Record<string, any> = {
        'api_key': token,
        ...params
    };

    const fetchUrl = `${url}?${buildQueryParams(queryParams)}`;

    return await fetch(fetchUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }

        throw response;
    }).then((data) => data);
}

const buildQueryParams = (params: Record<string, any>) => {
    return Object
        .keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export {
    getMovies,
    getMovieDetail,
    searchMovies,
    getMovieCredits,
    getMovieRecommendations
}
