import 'ckeditor5/ckeditor5.css';
import React from 'react';
import {Container} from "@/components/shared/container";
import TopPublicationsCard from "@/components/shared/top-publications-card";
import DetailNewsImgCarousel from "@/components/shared/detail-news-img-carousel";
import AddComments from "@/components/shared/add-comments";
import EmojiReactions from '@/components/shared/emoji-reactions';
import {getOneNews, getSimilarNewsList} from "@/lib/fetchData";
import {processContent} from '@/lib/utils';
import Link from "next/link"
import {format} from "date-fns";


const Page = async ({params}) => {
    const {slug} = await params;
    const news = await getOneNews(slug);
    const createdDate = format(news?.created_at, "dd.MM.yyyy")
    const similarNews = await getSimilarNewsList(slug, "5");
    const content = processContent(news?.content);

    return (
        <Container className="lg:flex block gap-6 py-6 mb-10 mt-6 md:bg-transparent bg-white">
            <div className="flex-1">
                <div className="md:p-6 md:border md:border-[#E0EBFF] bg-white rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <Link href={`/search?rubric=${news.rubric?.slug}`}><span
                            className="font-bold text-[#1757B9] text-sm">{news.rubric?.title}</span></Link>
                        <span className="font-normal text-[#777E98] text-xs">{createdDate}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                        {news?.title}
                    </h2>
                    {news.media && <DetailNewsImgCarousel images={news?.media}/>}
                    <div
                        dangerouslySetInnerHTML={{__html: content}}
                        className="ck-content"
                    ></div>
                    <Link href={`/search?author=${news?.author?.slug}`}>{news?.author?.full_name}</Link>
                    <div className="flex flex-wrap items-center gap-2 mt-5 mb-6">
                        {news?.tags?.map((tag) => (
                            <Link key={tag.slug} href={`search?tags=${tag.slug}`} className="mb-2">
                                <span
                                    className="py-2 px-4 border border-[#D1E2FF] rounded-full font-semibold text-xs text-[#101828]">{tag.name}</span>
                            </Link>
                        ))}
                    </div>
                    <EmojiReactions slug={news.slug} reactions={news?.reactions}/>
                </div>
                <AddComments slug={news.slug}/>
            </div>
            {
                similarNews.length > 0 && (
                    <div className="lg:w-[267px] w-full lg:mt-0 mt-6 md:border border-[#E0EBFF] rounded-lg bg-white h-full">
                        <h4 className="text-sm mt-7 mb-4 text-center font-bold">
                            Похожие публикации
                        </h4>
                        <TopPublicationsCard classname="last:mb-8" newsList={similarNews}/>
                    </div>
                )
            }

        </Container>
    );
};

export default Page;