const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_API_TOKEN;

const getMovies = async (page: number, sortParam: string) => {
    const params: Record<string, any> = {
        'page': page,
        'sort_by': sortParam
    };

    const url = `${baseUrl}discover/movie`;
    return await customFetch({ url, params });
}

const getMovieDetail = async (id: string) => {
    const url = `${baseUrl}movie/${id}}`;
    return await customFetch({ url });
}

const getMovieCredits = async (id: string) => {
    const url = `${baseUrl}movie/${id}/credits`;
    return await customFetch({ url });
}

const getMovieRecommendations = async (id: string) => {
    const url = `${baseUrl}movie/${id}/recommendations`;
    return await customFetch({ url });
}

const searchMovies = async (query: string) => {
    const params: Record<string, any> = {
        'query': query
    };

    const url = `${baseUrl}search/movie`;
    return await customFetch({ url, params });
}

const rateMovie = async (id: number, rate: number, guestSessionId: string) => {
    const params: Record<string, any> = {
        'guest_session_id': guestSessionId
    };

    const url = `${baseUrl}movie/${id}}/rating`;

    return await customFetch({
        url,
        params,
        method: 'POST',
        body: JSON.stringify({
            value: rate
        }),
    });
}

const createGuestSessionId = async () => {
    const url = `${baseUrl}authentication/guest_session/new`;
    return await customFetch({ url });
}

const customFetch = async ({
    url,
    params,
    method = 'GET',
    body
}: {
    url: string,
    params?: Record<string, any>,
    method?: string,
    body?: string
}) => {
    const queryParams: Record<string, any> = {
        'api_key': token,
        ...params
    };

    const fetchUrl = `${url}?${buildQueryParams(queryParams)}`;

    return await fetch(fetchUrl, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body
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
    getMovieRecommendations,
    rateMovie,
    createGuestSessionId
}
