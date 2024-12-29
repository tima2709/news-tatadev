import React from 'react';
import NewsArchive from "@/components/shared/news-archive";
import NewsList from "@/components/shared/news-list";
import Image from "next/image";
import {getSearchedData} from "@/lib/fetchData";
import {Container} from "@/components/shared/container";

const Page = async ({searchParams}) => {

    const query = await searchParams;
    const slug = Object.values(query).join('');
    const keyOfQuery = Object.keys(query).join('');

    const searchData = await getSearchedData(`${keyOfQuery}=${slug}`);

    return (
        <Container>
            <NewsArchive page="archive-news" className="mb-6"/>
            <div>
                {searchData?.results.length
                    ? searchData?.results?.map((news) => (
                        <NewsList key={news.slug} news={news} className="mb-6"/>
                    ))
                    :
                    <Image
                        src="/image_nothing-found.png"
                        alt={'image nothing found'}
                        width={360}
                        height={360}
                        className="mt-11"
                    />
                }
            </div>
        </Container>
    );
};

export default Page;