'use server'
import {cookies} from "next/headers";

async function apiRequest(relative_path, method = 'GET', data = null) {
    const cookieStore = await cookies();
    try {
        const response = await fetch(
            process.env.API_ENDPOINT + relative_path,
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
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

export const getHeaderData = async () => {
    return await apiRequest(`main-page/`);
}

export const getMainNewsListData = async () => {
    const news = await apiRequest('publications/news/');
    return news?.results
}

export const getTopNewsData = async () => {
    return await apiRequest(`publications/news/top/`);
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
    return await apiRequest(`publications/news/?${query}`);
}

export const getComments = async (slug) => {
    return await apiRequest(`publications/news/${slug}/comments/`)
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

export const getDateNews = async (date) => {
    return await apiRequest(`publications/news/create-dates-by-month/?date=${date}`)
}

export const getHolidays = async (month) => {
    return await apiRequest(`holidays/?month=${month}`)
}

export const getExchangesRates = async () => {
    return await apiRequest('exchanges/rates/')
}

