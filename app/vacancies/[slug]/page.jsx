import React from 'react';
import {Container} from "@/components/shared/container";
import {getVacanciesDataBySlug} from "@/lib/fetchData";
import 'ckeditor5/ckeditor5.css';
import {format} from "date-fns";
import Link from "next/link";
import ShareSocialMedia from "@/components/shared/share-social-media";


const Page = async ({params}) => {

    const {slug} = await params;

    const news = await getVacanciesDataBySlug(slug);

    const createdDate = format(news?.created_at, "dd.MM.yyyy")

    return (
        <Container className="flex gap-6 py-6 mt-6">
            <div className="lg:w-[calc(100%-291px)] border border-[#E0EBFF] bg-white rounded-lg p-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <Link href="/vacancies"><span className="text-xs font-semibold text-[#1757B9]">Вакансии</span></Link>
                        <span className="font-normal text-[#777E98] text-xs">{createdDate}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-5">
                        {news.title}
                    </h2>
                    <div
                        dangerouslySetInnerHTML={{__html: news?.content}}
                        className="ck-content"
                    ></div>
                </div>
                <div className="flex justify-end">
                    <ShareSocialMedia news={news} pageEndpoint="/vacancies/"/>
                </div>
            </div>
        </Container>
    );
};

export default Page;