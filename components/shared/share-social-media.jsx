import React from 'react';
import Head from "next/head";
import {getSocialShareMedia} from "@/lib/fetchData";
import Image from "next/image";
import CopyToClipboard from "@/components/shared/copyToClipboard";

const ShareSocialMedia = async ({news}) => {

    const shareMedia = await getSocialShareMedia();
    return (
        <>
            <Head>
                <title>{news?.title}</title>
                <meta name="description" content={news?.preview}/>
                <meta name="keywords" content={news?.tags}/>

                <meta property="og:title" content={news?.title}/>
                <meta property="og:description" content={news?.preview}/>
                <meta property="og:image" content={news?.cover_img}/>
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL_NEWS_DETAIL}${news?.slug}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content="ru_RU"/>

                <meta property="vk:image" content={news?.cover_img}/>

                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>

            <div className="flex gap-2 items-center md:mt-0 mt-6">
                <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title)}%20${encodeURIComponent(process.env.NEXT_PUBLIC_URL_NEWS_DETAIL + news.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={shareMedia[2]?.icon} alt={shareMedia[2]?.network} width={32} height={32}/>
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_URL_NEWS_DETAIL + news.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={shareMedia[3].icon} alt={shareMedia[3].network} width={32} height={32}/>
                </a>
                <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(process.env.NEXT_PUBLIC_URL_NEWS_DETAIL + news.slug)}&text=${encodeURIComponent(news.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={shareMedia[0].icon} alt={shareMedia[0].network} width={32} height={32}/>
                </a>
                <a
                    href={`https://vk.com/share.php?url=${encodeURIComponent(process.env.NEXT_PUBLIC_URL_NEWS_DETAIL + news.slug)}&title=${encodeURIComponent(news.title)}&image=${encodeURIComponent(news.cover_img)}&description=${encodeURIComponent(news.description)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={shareMedia[1].icon} alt={shareMedia[1].network} width={32} height={32}/>
                </a>
                <CopyToClipboard slug={news?.slug} shareMedia={shareMedia}/>
            </div>
        </>
    );
};

export default ShareSocialMedia;