import React from 'react';
import NewsList from "@/components/shared/news-list";
import Image from "next/image";
import {Container} from "@/components/shared/container";

const Page = () => {

    return (
        <Container>
            <div className="flex gap-6 pb-10">
                <div className="flex-1">
                    <div>
                        {searchData.results.length
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
                </div>
            </div>
        </Container>
    );
};

export default Page;