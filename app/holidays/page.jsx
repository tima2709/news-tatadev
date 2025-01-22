import React from 'react';
import HolidaysCalendarList from "@/components/sections/holidays-calendar-list";
import {Container} from "@/components/shared/container";
import {getMetaTags} from "@/lib/fetchData";
import {headers} from "next/headers";

export async function generateMetadata() {
    const data = await getMetaTags('holidays')
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/${data?.url_path}`;

    return {
        title: data?.title || "Чуйские известия - Главные новости и события",
        description: data?.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data?.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data?.title || "Project Meta Title",
            description: data?.description || "Project Meta Description",
            url: data?.url || currentUrl || "https://chuiskieizvestia.kg/",
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

const Page = () => {
    return (
        <Container className="pt-6">
            <HolidaysCalendarList className="md:w-[267px] w-full"/>
        </Container>
    );
};

export default Page;