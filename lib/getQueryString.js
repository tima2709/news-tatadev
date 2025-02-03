

export const getQueryString = (query) => {
    if (!query || typeof query !== 'object' || !Object.keys(query)?.length) {
        return '';
    }
    if (Object.keys(query).includes("undefined")) {
        delete query?.undefined
    }

    const queryString = Object.entries(query)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    return `${queryString}`;
};
