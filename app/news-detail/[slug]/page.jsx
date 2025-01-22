import 'ckeditor5/ckeditor5.css';
import React from 'react';
import {Container} from "@/components/shared/container";
import TopPublicationsCard from "@/components/shared/top-publications-card";
import DetailNewsImgCarousel from "@/components/shared/detail-news-img-carousel";
import AddComments from "@/components/shared/add-comments";
import EmojiReactions from '@/components/shared/emoji-reactions';
import {getMetaTags, getNewsByAuthor, getOneNews, getSimilarNewsList} from "@/lib/fetchData";
import {processContent} from '@/lib/utils';
import Link from "next/link"
import {format} from "date-fns";
import ShareSocialMedia from "@/components/shared/share-social-media";
import {headers} from "next/headers";





export async function generateMetadata({params}) {
    const {slug} = await params;
    const data = await getMetaTags(`/news-detail/${slug}`);
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/news-detail/${slug}`;

    return {
        title: data?.title || "Чуйские известия - Главные новости и события",
        description: data?.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data?.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data?.title || "Project Meta Title",
            description: data?.description || "Project Meta Description",
            url: data?.url || currentUrl || `https://chuiskieizvestia.kg/news-detail/${slug}`,
            type: "website",
            images: [{url: data?.image || "/logo-image.svg"}],
        },
        verification: {
            google: data.google || "string",
            yandex: data.yandex || "string",
        },
        icons: {
            icon: data?.image || "/logo-image.svg",
        },
        authors: {
            name: "TataDev Team",
        },
    };
}


const Page = async ({params}) => {
    const {slug} = await params;
    const news = await getOneNews(slug);
    const createdDate = format(news?.created_at, "dd.MM.yyyy")
    const similarNews = await getSimilarNewsList(slug, "5");
    const authorsNews = await getNewsByAuthor(news?.author?.slug, slug)
    const content = processContent(news?.content);

    console.log(authorsNews, 'auth')

    return (
        <Container className="lg:flex block gap-6 pt-6 pb-10 md:bg-transparent bg-white">
            <div className="flex-1">
                <div className="md:p-6 md:border md:border-[#E0EBFF] bg-white rounded-lg md:mb-6 mb-10">
                    <div className="flex items-center justify-between mb-5">
                        <Link href={`/search?rubric=${news.rubric?.slug}&page=1`}><span
                            className="font-bold text-[#1757B9] text-sm">{news.rubric?.title}</span></Link>
                        <span className="font-normal text-[#777E98] text-xs">{createdDate}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                        {news?.title}
                    </h2>
                    {news.media && <DetailNewsImgCarousel images={news?.media}/>}
                    <div
                        dangerouslySetInnerHTML={{__html: content}}
                        className="ck-content mb-5 "
                    ></div>
                    <div className="my-5">
                        {news?.author?.full_name && <Link href={`/search?author=${news?.author?.slug}&page=1`}><span className="text-xs font-normal text-[#1757B9]">Автор: {news?.author?.full_name}</span></Link>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-5 mb-6">
                        {news?.tags?.map((tag) => (
                            <Link key={tag.slug} href={`/search?tags=${tag.slug}&page=1`} className="mb-2">
                                <span
                                    className="py-2 px-4 border border-[#D1E2FF] rounded-full font-semibold text-xs text-[#101828]">{tag.name}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="md:flex flex-wrap block items-center justify-between">
                        <EmojiReactions slug={slug} reactions={news?.reactions}/>
                        <ShareSocialMedia news={news} pageEndpoint="/news-detail/"/>
                    </div>
                </div>
                <AddComments slug={news.slug}/>
            </div>
           <div>
               {
                   similarNews.length > 0 && (
                       <div className="lg:w-[267px] mb-5 h-max w-full lg:mt-0 mt-6 md:border border-[#E0EBFF] rounded-lg bg-white h-full">
                           <h4 className="text-sm mt-7 mb-4 text-center font-bold">
                               Похожие публикации
                           </h4>
                           <TopPublicationsCard classname="last:mb-8" newsList={similarNews}/>
                       </div>
                   )
               }
               {
                   authorsNews?.results?.length > 0 && (
                       <div className="lg:w-[267px] h-max w-full lg:mt-0 mt-6 md:border border-[#E0EBFF] rounded-lg bg-white h-full">
                           <h4 className="text-sm mt-7 mb-4 text-center font-bold">
                               Статьи этого автора
                           </h4>
                           <TopPublicationsCard classname="last:mb-8" newsList={authorsNews?.results}/>
                       </div>
                   )
               }
           </div>

        </Container>
    );
};

export default Page;