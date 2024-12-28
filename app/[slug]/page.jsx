import React from 'react';
import {Container} from "@/components/shared/container";
import TopPublicationsCard from "@/components/shared/top-publications-card";
import DetailNewsImgCarousel from "@/components/shared/detail-news-img-carousel";
import AddComments from "@/components/shared/add-comments";
import {getOneNews} from "@/lib/fetchData";
import 'ckeditor5/ckeditor5.css';
import Link from "next/link"
import {format} from "date-fns";


const Page = async ({params}) => {

    const {slug} = await params;

    const news = await getOneNews(slug);

    console.log(news, 'news')

    const createdDate = format(news?.created_at, "dd.MM.yyyy")

    return (
        <Container className="flex gap-6 py-6 mb-10 mt-6">
            <div className="flex-1">
                <div className="p-6 border border-[#E0EBFF] bg-white rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <Link href={`/search`}><span className="font-bold text-[#1757B9] text-sm">{news.rubric.title}</span></Link>
                        <span className="font-normal text-[#777E98] text-xs">{createdDate}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                        {news.title}
                    </h2>
                    {news.media && <DetailNewsImgCarousel images={news?.media}/>}
                    <div
                        dangerouslySetInnerHTML={{ __html: news?.content }}
                        className="ck-content"
                    ></div>
                    <Link href={`/search?author=${news?.author?.slug}`}>{news?.author?.full_name}</Link>
                    <div className="flex items-center gap-2 mt-5 mb-6">
                        {news?.tags?.map((tag) => (
                            <Link href={`search?tags=${tag.slug}`}>
                                <span className="py-2 px-4 border border-[#D1E2FF] rounded-full font-semibold text-xs text-[#101828]">{tag.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <AddComments/>
            </div>

            <div className="w-[267px] border border-[#E0EBFF] rounded-[8px] bg-white h-full">
                <h4 className="text-sm mt-7 mb-4 text-center font-bold">
                    Похожие публикации
                </h4>
                <TopPublicationsCard classname="last:mb-8"/>
            </div>
        </Container>
    );
};

export default Page;