import React from 'react';
import NewsList from "@/components/shared/news-list";
import Image from "next/image";
import {Container} from "@/components/shared/container";
import {getAttentionsData, getVacanciesData} from "@/lib/fetchData";
import AttetionList from "@/components/shared/attention-list";

const Page = async () => {

    const vacancies = await getVacanciesData();

    return (
        <Container>
            <div className="flex gap-6 pb-10 lg:w-[calc(100%-291px)]">
                <div className="flex-1">
                    <h2 className="mb-5">Вакансии</h2>
                    <div>
                        {vacancies?.results.length
                            ? vacancies?.results?.map((news) => (
                                <AttetionList pathName="vacancies" key={news.slug} news={news} className="mb-6"/>
                            ))
                            :
                            <div>
                                <p className="text-base font-normal text-[#101828]">Здесь будут отображаться доступные вакансии</p>
                                <Image
                                    src="/image_job.png"
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