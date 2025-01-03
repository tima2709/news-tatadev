'use server';

import {cookies} from "next/headers";


async function apiRequest(relativePath, method = 'GET', data = null, parseJson = true) {
    const cookieStore = await cookies();

    try {
        const response = await fetch(
            process.env.API_ENDPOINT + relativePath,
            {
                method: method,
                credentials: 'include',
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json"
                },
                body: data ? JSON.stringify(data): null,
            }
        );
        if (!response.ok) {
            return null
        }

        return parseJson ? await response.json() : response.status;
    } catch (error) {
        console.error(`URL: ${relativePath} Method: ${method}`, error.message);
        return Promise.reject(error.message);
    }
}

export const getHeaderData = async () => {
    return await apiRequest(`main-page/`);
}

export const getMainNewsListData = async () => {
    const news = await apiRequest('publications/news/');
    return news?.results
}

export const getUrgentNewsList = async (size) => {
    const news = await apiRequest(`publications/news/?urgent=true&page_size=${size}`);
    return news?.results
}

export const getTopNewsData = async () => {
    return await apiRequest(`publications/news/top/`);
}

export const getSimilarNewsList = async (slug, size) => {
    const news = await apiRequest(`publications/news/${slug}/similar/?page_size=${size}`);
    return news?.results;
}

export const getRubrics = async () => {
    return await apiRequest(`publications/news/rubrics/`);
}

export const getNewsByRubrics = async (rubrics) => {
    const requests = rubrics.map(async (rubric) =>
        await apiRequest(`publications/news/?rubric=${rubric.slug}`)
            .then((response) => ({
                name: rubric.title,
                slug: rubric.slug,
                type: rubric.type,
                news: response.results,
            }))
            .catch((error) => {
                console.error(`Failed to fetch products for category ${rubric.slug}:`, error.message);
                return {name: rubric.name, slug: rubric.slug, news: []};
            })
    );

    const results = await Promise.all(requests);
    return results;
};

export const getOneNews = async (slug) => {
    if (!slug) {
        throw new Error('Slug is required');
    }
    return await apiRequest(`publications/news/${slug}/`);
};

export const getSearchedData = async (query) => {
    return await apiRequest(`publications/news/?${query}&page_size=10`);
}

export const getComments = async (slug) => {
    return await apiRequest(`publications/news/${slug}/comments/`);
}

export const postComment = async (slug, data) => {
    if (!slug) {
        throw new Error("Slug is required");
    }
    return await apiRequest(`publications/news/${slug}/comments/`, "POST", data);
};

export const getAttentionsData = async () => {
    return await apiRequest(`publications/attentions/`)
}

export const getOneAttentionsData = async (slug) => {
    return await apiRequest(`publications/attentions/${slug}/`)
}

export const getStaticPages = async () => {
    return await apiRequest('static-pages/')
}

export const getStaticPagesBySlug = async (slug) => {
    return await apiRequest(`static-pages/${slug}/`)
}

export const getVacanciesData = async () => {
    return await apiRequest('publications/vacancies/')
}

export const getVacanciesDataBySlug = async (slug) => {
    return await apiRequest(`publications/vacancies/${slug}/`)
}

export const getSocialLinks = async () => {
    return await apiRequest('social-links/')
}

export const getPartners = async () => {
    return await apiRequest('partners/')
}

export const getAvailableEmojis = async () => {
    return await apiRequest("available-emojis/");
};


export const createEmoji = async (slug, emoji) => {
    return await apiRequest(
        `publications/news/${slug}/emoji/`,
        "POST",
        {"emoji": emoji},
        false
    );
};

export const destroyEmoji = async (slug) => {
    return await apiRequest(`publications/news/${slug}/emoji/`, "DELETE", null, false);
};
export const getDateNews = async (date) => {
    return await apiRequest(`publications/news/create-dates-by-month/?date=${date}`)
}

export const getHolidays = async (month) => {
    return await apiRequest(`holidays/?month=${month}`)
}

export const getExchangesRates = async () => {
    return await apiRequest('exchanges/rates/')
}

export const getWeather = async () => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=42.8746&longitude=74.6123&current_weather=true`);
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return Promise.reject(error.message);
    }
}

export const getRandomBanner = async () => {
    return await apiRequest('advertising/random-banner/')
}

export const getMetaTags = async (endpoint) => {
    return await apiRequest(`meta-tags/?url_path=${endpoint}`)
}

