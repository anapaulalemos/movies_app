const baseUrl = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_API_TOKEN;

const getMovies = async () => {
    const url = `${baseUrl}movie/popular`;
    return await fetchGet(url);
}

const getMovieDetail = async (id: string) => {
    const url = `${baseUrl}movie/${id}`;
    return await fetchGet(url);
}

const fetchGet = async (url: string) => {
    return await fetch(`${url}?api_key=${token}`, {
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


export {
    getMovies,
    getMovieDetail,

}
