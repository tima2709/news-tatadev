import React from 'react';
import {getMetaTags, getStaticPagesBySlug} from "@/lib/fetchData";
import {Container} from "@/components/shared/container";
import {headers} from "next/headers";

export async function generateMetadata({params}) {
    const {slug} = await params;
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}/static-page/${slug}`;

    const data = await getMetaTags(`${slug}`)
    return {
        title: data?.title || "Чуйские известия - Главные новости и события",
        description: data?.description || "Ежедневные новости, политики, экономики, общества, спорта и культуры. Актуальная информация и аналитика.",
        keywords: data?.keywords || "новости, Чуйские известия, политика, экономика, общество, происшествия",
        openGraph: {
            title: data?.title || "Project Meta Title",
            description: data?.description || "Project Meta Description",
            url: data?.url || currentUrl || `https://chuiskieizvestia.kg/static-page/${slug}`,
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

    const staticData = await getStaticPagesBySlug(slug);

    return (
        <Container className="min-h-[600px]">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="mb-6">{staticData.title}</h2>
                <div
                    dangerouslySetInnerHTML={{__html: staticData?.content}}
                    className="ck-content"
                ></div>
            </div>
        </Container>
    );
};

export default Page;