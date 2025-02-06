import React from 'react';
import {Container} from "@/components/shared/container";
import {getMetaTags, getOneAttentionsData} from "@/lib/fetchData";
import 'ckeditor5/ckeditor5.css';
import {format} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ShareSocialMedia from "@/components/shared/share-social-media";
import {headers} from "next/headers";
import NotFound from "@/app/not-found";

export async function generateMetadata({params}) {
    const {slug} = await params;
    const data = await getMetaTags(`attentions/${slug}`)
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/attentions/${slug}`;

    return {
        title: data?.title || "Чуйские известия - Главные новости и события",
        description: data?.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data?.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data?.title || "Project Meta Title",
            description: data?.description || "Project Meta Description",
            url: data?.url || currentUrl || `https://chuiskieizvestia.kg/attentions/${slug}`,
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

    const news = await getOneAttentionsData(slug);

    if (!news) {
        return <NotFound/>
    }

    const createdDate = format(news?.created_at, "dd.MM.yyyy")

    return (
        <Container className="flex gap-6 py-6 mt-6">
            <div className="lg:w-[calc(100%-291px)] p-6 border border-[#E0EBFF] bg-white rounded-lg">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <Link href="/attentions"><span className="text-xs font-semibold text-[#1757B9]">Объявления</span></Link>
                        <span className="font-normal text-[#777E98] text-xs">{createdDate}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                        {news.title}
                    </h2>
                    <Image
                        src={news.cover_img}
                        alt={news.title}
                        width={801}
                        height={493}
                        className="object-cover rounded-lg mb-8"
                        priority={true}
                    />
                    <div
                        dangerouslySetInnerHTML={{__html: news?.content}}
                        className="ck-content"
                    ></div>
                </div>
                <div className="flex justify-end">
                    <ShareSocialMedia news={news} pageEndpoint="/attentions/"/>
                </div>
            </div>
        </Container>
    );
};

export default Page;