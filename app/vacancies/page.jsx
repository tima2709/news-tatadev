import React from 'react';
import NewsList from "@/components/shared/news-list";
import Image from "next/image";
import {Container} from "@/components/shared/container";
import {getAttentionsData, getMetaTags, getVacanciesData} from "@/lib/fetchData";
import AttetionList from "@/components/shared/attention-list";
import {headers} from "next/headers";

export async function generateMetadata() {
    const data = await getMetaTags('vacancies')
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/vacancies/`;

    return {
        title: data?.title || "Чуйские известия - Главные новости и события",
        description: data?.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data?.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data?.title || "Project Meta Title",
            description: data?.description || "Project Meta Description",
            url: data?.url || currentUrl || "https://chuiskieizvestia.kg/",
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

const Page = async () => {

    const vacancies = await getVacanciesData();

    return (
        <Container>
            <div className="flex gap-6 pt-6 pb-10 lg:w-[calc(100%-291px)]">
                <div className="flex-1">
                    <h2 className="mb-5">Вакансии</h2>
                    <div>
                        {vacancies?.results.length
                            ? vacancies?.results?.map((news) => (
                                <AttetionList pathName="vacancies" key={news.slug} news={news} className="mb-6" title="Вакансии"/>
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