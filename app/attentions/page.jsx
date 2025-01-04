import React from 'react';
import Image from "next/image";
import {Container} from "@/components/shared/container";
import {getAttentionsData, getMetaTags} from "@/lib/fetchData";
import AttetionList from "@/components/shared/attention-list";

export async function generateMetadata() {
    const data = await getMetaTags('attentions')
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

const Page = async () => {

    const attentions = await getAttentionsData();

    return (
        <Container>
            <div className="flex gap-6 pb-10 lg:w-[calc(100%-291px)]">
                <div className="flex-1">
                    <h2 className="mb-5">Объявления</h2>
                    <div>
                        {attentions?.results.length
                            ? attentions?.results?.map((news) => (
                                <AttetionList pathName="attentions" key={news.slug} news={news} className="mb-6"/>
                            ))
                            :
                            <div>
                                <p className="text-base font-normal text-[#101828]">На даный момент объявлений нет, но очень скоро появятся!</p>
                                <Image
                                    src="/image_no-email.png"
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