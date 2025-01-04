import React from 'react';
import HolidaysCalendarList from "@/components/sections/holidays-calendar-list";
import {Container} from "@/components/shared/container";
import {getMetaTags} from "@/lib/fetchData";

export async function generateMetadata() {
    const data = await getMetaTags('holidays')
    return {
        title: data.title || "Чуйские известия - Главные новости и события",
        description:data.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data.title || "Project Meta Title",
            description: data.description || "Project Meta Description",
            url: data?.url_path || "https://news.tatadev.dev/",
            type: "website",
            images: [{ url: data.image || "/logo-with-name.svg" }],
        },
        verification: {
            google: "string",
            yandex: "string",
        },
        icons: {
            icon: data.image || "/logo-image.svg",
        },
        authors: {
            name: "TataDev Team",
        },
    }
}

const Page = () => {
    return (
        <Container>
            <HolidaysCalendarList className="md:w-[267px] w-full"/>
        </Container>
    );
};

export default Page;