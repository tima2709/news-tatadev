import { cookies } from "next/headers";

async function getData(relative_path, method = 'GET') {
    const cookieStore = await cookies();
    try {
        const response = await fetch(
            process.env.API_ENDPOINT + relative_path, 
            {
                method: method,
                credentials: 'include',
                headers: {Cookie: cookieStore.toString()}
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
    return await getData(`main-page/`);
}

export const getMainNewsListData = async () => {
    const news = await getData('publications/news/');
    return news?.results
}

export const getTopNewsData = async () => {
    return await getData(`publications/news/top/`);
}

export const getRubrics = async () => {
    return await getData(`publications/news/rubrics/`);
}

export const getNewsByRubrics = async (rubrics) => {
    const requests = rubrics.map(async (rubric) =>
        await getData(`publications/news/?rubric=${rubric.slug}`)
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
    return await getData(`publications/news/${slug}/`);
};

export const getSearchedData = async (query) => {
    return await getData(`publications/news/?${query}`);
}
