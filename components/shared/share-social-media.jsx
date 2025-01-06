import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {getMetaTags, getSocialShareMedia} from '@/lib/fetchData';
import CopyToClipboard from '@/components/shared/copyToClipboard';

const ShareSocialMedia = async ({ news, pageEndpoint }) => {

    const shareMedia = await getSocialShareMedia();
    const data = await getMetaTags(`${pageEndpoint}${news.slug}`);

    const {
        title,
        keywords,
        image,
        description,
        url_path
    } = data;

    const shareUrl = `${process.env.API_MEDIA_URL}${url_path}`;

    const socialLinks = [
        {
            network: 'telegram',
            url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
            icon: shareMedia[0]?.icon
        },
        {
            network: 'vk',
            url: `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
            icon: shareMedia[1]?.icon
        },
        {
            network: 'whatsapp',
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(description)}`,
            icon: shareMedia[2]?.icon
        },
        {
            network: 'facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            icon: shareMedia[3]?.icon
        }
    ];

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ru_RU" />
                <meta property="vk:image" content={image} />
            </Head>

            <div className="flex gap-2 items-center md:mt-0 mt-6">
                {socialLinks.map((social, index) => (
                    social.icon && (
                        <a
                            key={social.network}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-opacity hover:opacity-80"
                            aria-label={`Share on ${social.network}`}
                        >
                            <Image
                                src={social.icon}
                                alt={social.network}
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </a>
                    )
                ))}
                <CopyToClipboard slug={news.slug} shareMedia={shareMedia} links={shareUrl} />
            </div>
        </>
    );
};

export default ShareSocialMedia;