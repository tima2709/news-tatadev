import React from 'react';
import NewsArchive from "@/components/shared/news-archive";
import NewsList from "@/components/shared/news-list";
import Image from "next/image";
import {getMetaTags, getSearchedData} from "@/lib/fetchData";
import {Container} from "@/components/shared/container";
import {getQueryString} from "@/lib/getQueryString";
import YoutubeCard from "@/components/shared/youtube-card";

export async function generateMetadata() {
    const data = await getMetaTags('archive-news')
    return {
        title: data.title || "Чуйские известия - Главные новости и события",
        description:data.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data.title || "Project Meta Title",
            description: data.description || "Project Meta Description",
            url: data?.url_path || "https://news.tatadev.dev/",
            type: "website",
            images: [{ url: data.image || "/logo-with-name.svg" }],
        },
        verification: {
            google: "string",
            yandex: "string",
        },
        icons: {
            icon: data.image ||  "/logo-image.svg",
        },
        authors: {
            name: "TataDev Team",
        },
    }
}

const Page = async ({searchParams}) => {

    const query = await searchParams;
    const queryString = getQueryString(query);
    const searchData = await getSearchedData(queryString);

    return (
        <Container>
            <NewsArchive page="archive-news" className="mb-6"/>
            <div>
                {searchData?.results?.length
                    ? searchData?.results?.map((news) => (
                        news.rubric.type === "article"
                            ? <NewsList key={news.slug} news={news} className="mb-6"/>
                            : <YoutubeCard key={news.slug} news={news} className="mb-6"/>
                    ))
                    :
                    <div>
                        <h2>По данному запросу ничего не найдено</h2>
                        <Image
                            src="/image_nothing-found.png"
                            alt={'image nothing found'}
                            width={360}
                            height={360}
                            className="mt-11"
                        />
                    </div>
                }
            </div>
        </Container>
    );
};

export default Page;