import React from 'react';
import NewsList from "@/components/shared/news-list";
import Image from "next/image";
import {Container} from "@/components/shared/container";
import {getAttentionsData} from "@/lib/fetchData";
import AttetionList from "@/components/shared/attention-list";

const Page = async () => {

    const attentions = await getAttentionsData();

    console.log(attentions, 'att')

    return (
        <Container>
            <div className="flex gap-6 pb-10 lg:w-[calc(100%-291px)]">
                <div className="flex-1">
                    <h2 className="mb-5">Объявления</h2>
                    <div>
                        {attentions?.results.length
                            ? attentions?.results?.map((news) => (
                                <AttetionList pathName="attentions" key={news.slug} news={news} className="mb-6"/>
                            ))
                            :
                            <div>
                                <p className="text-base font-normal text-[#101828]">На даный момент объявлений нет, но очень скоро появятся!</p>
                                <Image
                                    src="/image_no-email.png"
                                    alt={'image nothing found'}
                                    width={360}
                                    height={360}
                                    className="mt-11"
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Page;