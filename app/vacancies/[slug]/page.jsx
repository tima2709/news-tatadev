import React from 'react';
import {Container} from "@/components/shared/container";
import {getMetaTags, getVacanciesDataBySlug} from "@/lib/fetchData";
import 'ckeditor5/ckeditor5.css';
import {format} from "date-fns";
import Link from "next/link";
import ShareSocialMedia from "@/components/shared/share-social-media";
import {headers} from "next/headers";
import NotFound from "@/app/not-found";

export async function generateMetadata({params}) {
    const {slug} = await params;
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/vacancies/${slug}`;

    const data = await getMetaTags(`${slug}`)
    return {
        title: data?.title || "Чуйские известия - Главные новости и события",
        description: data?.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data?.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data?.title || "Project Meta Title",
            description: data?.description || "Project Meta Description",
            url: data?.url || currentUrl || `https://chuiskieizvestia.kg/vacancies/${slug}`,
            type: "website",
            images: [{ url: data?.image || "/logo-image.svg" }],
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

    const news = await getVacanciesDataBySlug(slug);

    if (!news) {
        return <NotFound/>
    }

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