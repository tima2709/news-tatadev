import axios from "axios";

export const API = 'https://news.tatadev.dev/api/v1/'

const api = axios.create({
    baseURL: API,
    withCredentials: true
})

export const getHeaderData = async () => {
    try {
        const res = await axios.get(`${API}main-page/`)
        return res.data
    } catch (e) {
        console.error(e.message)
    }
}

export const getMainNewsListData = async () => {
    try {
        const res = await axios.get(`${API}publications/news/`)
        return res.data.results
    } catch (e) {
        console.error(e.message)
    }
}

export const getTopNewsData = async () => {
    try {
        const res = await axios.get(`${API}publications/news/top/`)
        return res.data
    } catch (e) {
        console.error(e.message)
    }
}

export const getRubrics = async () => {
    try {
        const res = await axios.get(`${API}publications/news/rubrics/`)
        return res.data
    } catch (e) {
        console.error(e.message)
    }
}

export const getNewsByRubrics = async (rubrics) => {
    try {
        const requests = rubrics.map((rubric) =>
            axios
                .get(`${API}publications/news/?rubric=${rubric.slug}`)
                .then((response) => ({
                    name: rubric.title,
                    slug: rubric.slug,
                    type: rubric.type,
                    news: response.data.results,
                }))
                .catch((error) => {
                    console.error(`Failed to fetch products for category ${rubric.slug}:`, error.message);
                    return {name: rubric.name, slug: rubric.slug, news: []};
                })
        );

        const results = await Promise.all(requests);
        return results;
    } catch (e) {
        console.error(e.message);
        throw new Error('Failed to fetch news data by rubrics');
    }
};

export const getOneNews = async (slug) => {
    if (!slug) {
        throw new Error('Slug is required');
    }
    const url = `${API}publications/news/${slug}/`;

    try {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Cookie", "device_id=39e98ba5-14e7-4a6e-9de2-97493ced83d5");

        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders
        };

        const res = await fetch(url, requestOptions);
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('Failed to fetch one news data');
    }
};

// export const getOneNews = async (slug) => {
//     try {
//         const res =  await api.get(`publications/news/${slug}`)
//         console.log(res, 'res')
//         return res?.data
//     } catch (error) {
//         console.error(error.message)
//     }
// }

export const getSearchedData = async (query) => {
    try {
        const res = await api.get(`publications/news/?${query}`)
        return res?.data
    } catch (error) {
        console.error(error.message)
    }
}


