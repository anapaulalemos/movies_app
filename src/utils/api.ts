const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_API_TOKEN;

const getMovies = async (page: number) => {
    const params: Record<string, any> = {
        'page': page
    };

    const url = `${baseUrl}movie/popular`;
    return await fetchGet(url, params);
}

const getMovieDetail = async (id: string) => {
    const url = `${baseUrl}movie/${id}}`;
    return await fetchGet(url);
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

}
