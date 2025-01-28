import {Container} from "@/components/shared/container";
import MainNewsLists from "@/components/sections/main-news-lists";
import NewsRubrics from "@/components/sections/news-rubrics";
import WeatherExchange from "@/components/shared/weather-exchange";
import PartnersRunning from "@/components/shared/partners-running";
import RunningNews from "@/components/shared/running-news";
import React from "react";
import {getMetaTags} from "@/lib/fetchData";
import { headers } from 'next/headers';

export async function generateMetadata() {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/`;

    const data = await getMetaTags('home');
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


export default function Home() {
    return (
        <>
            <Container className="pb-12">
                <RunningNews/>
                <WeatherExchange
                    className="lg:hidden mt-6 flex md:flex-row mb-6 flex-col gap-4 md:justify-center justify-start  p-4 border border-[#E0EBFF] rounded-lg bg-white"/>
                <MainNewsLists/>
                <NewsRubrics/>
                <PartnersRunning/>
            </Container>
        </>
    );
}
