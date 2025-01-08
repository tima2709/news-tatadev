import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {getMetaTags, getSocialShareMedia} from '@/lib/fetchData';
import CopyToClipboard from '@/components/shared/copyToClipboard';

const ShareSocialMedia = async ({ news, pageEndpoint }) => {
    const shareMedia = await getSocialShareMedia();
    const metaData = await getMetaTags(`${pageEndpoint}${news.slug}`);
    const {
        title,
        keywords,
        image,
        description,
        url_path
    } = metaData;

    function buildShareResourceURL(network, context) {
        switch (network) {
            case "telegram":
                return `https://t.me/share/url?url=${encodeURIComponent(context?.shareURL)}&text=${encodeURIComponent(context?.title)}&image=${encodeURIComponent(context?.image)}&description=${encodeURIComponent(context?.description)}`;
            case "vk":
                return `https://vk.com/share.php?url=${encodeURIComponent(context?.shareURL)}&title=${encodeURIComponent(context?.title)}&image=${encodeURIComponent(context?.image)}&description=${encodeURIComponent(context?.description)}`;
            case "facebook":
                return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(context?.shareURL)}`;
            case "whatsapp":
                return `https://api.whatsapp.com/send?text=${encodeURIComponent(context?.title)}%20${encodeURIComponent(context?.shareURL)}&description=${encodeURIComponent(context?.description)}`;
            default:
                return;
        }
    }

    const shareURL = new URL(url_path, process.env.API_MEDIA_URL)
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
                <meta property="og:url" content={shareURL} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ru_RU" />
                <meta property="vk:image" content={image} />
            </Head>

            <div className="flex gap-2 items-center md:mt-0 mt-6">
                {shareMedia.map((shareItem) => {
                    switch (shareItem?.network) {
                        case "copy":
                            return (
                                <CopyToClipboard slug={news.slug} shareMedia={shareMedia} links={shareURL} />
                            );
                        default:
                            const resourceURL = buildShareResourceURL(shareItem?.network, {shareURL, title, description, image});
                            return (
                                <a
                                    key={shareItem?.network}
                                    href={resourceURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-opacity hover:opacity-80"
                                    aria-label={`Share on ${shareItem?.network}`}
                                >
                                    <Image
                                        src={shareItem?.icon}
                                        alt={shareItem?.network}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8"
                                    />
                                </a>
                            );
                    }
                })}
            </div>
        </>
    );
};

export default ShareSocialMedia;