'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import YoutubeCard from "@/components/shared/youtube-card";

const DetailNewsImgCarousel = ({media, galleryDelegate}) => {

    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const thumbnailsRef = useRef(null);

    const handlePreviewClick = (index) => {
        api?.scrollTo(index);
        setCurrent(index)
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    })

    useEffect(() => {
        if (thumbnailsRef.current) {
            const container = thumbnailsRef?.current;
            const thumbnail = container?.children[current];
            const thumbnailWidth = thumbnail?.offsetWidth;
            const scrollPosition = thumbnail?.offsetLeft - container?.offsetWidth / 3 + thumbnailWidth / 2;
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [current]);

    return (
        <div className="mb-8">
            <Carousel
                setApi={setApi}
                className="w-full bg-transparent"
            >
                <CarouselContent>
                    {media?.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full aspect-video md:rounded-lg rounded-sm overflow-hidden">
                                {item?.mime_type === "image/jpeg" ? (
                                    <a data-fancybox={galleryDelegate} data-src={item?.file} >
                                        <img
                                            src={item?.file}
                                            alt={`Slide ${index + 1}`}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </a>
                                ) : item?.mime_type === "video/mp4" || item?.file?.includes("www.youtube.com") ? (
                                    <YoutubeCard file={item.file}/>
                                ) : (
                                    <a data-fancybox={galleryDelegate} data-src={item?.file} >
                                        <img
                                            src={item?.file}
                                            alt={`Slide ${index + 1}`}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </a>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {
                    media?.length >= 6 &&
                    <>
                        <CarouselPrevious className="right-10 -bottom-16 top-110"/>
                        <CarouselNext className="right-0 -bottom-16 top-110"/>
                        <span
                            className="absolute -bottom-[4.5rem] right-1 font-medium text-sm text-[#777E98]">{`${current + 1} из ${media?.length}`}</span>
                    </>
                }
            </Carousel>

            <div
                ref={thumbnailsRef}
                className={`flex relative gap-4 mt-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${media?.length <= 5 ? 'items-center justify-center w-full' : 'max-w-[665px]'}`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {media?.length !== 1 && media.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => handlePreviewClick(idx)}
                        className={`sm:block hidden z-[1] relative flex-shrink-0 w-[118px] h-[72px] rounded-lg overflow-hidden transition-all snap-start ${
                            current === idx ? "opacity-100" : "opacity-50"
                        }`}
                    >
                        {item?.mime_type === "image/jpeg" ? (
                            <img
                                src={item?.file}
                                alt={item?.file}
                                className="w-full h-full object-cover"
                            />
                        ) : item?.mime_type === "video/mp4" || item?.mime_type === "video/ogg" ? (
                            <div className="relative">
                                <video
                                    src={item?.file}
                                    width="100%"
                                    height="100%"
                                    muted
                                    className="object-cover"
                                />
                                <img
                                    src="/polygon-video.svg"
                                    alt="polygon"
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            </div>
                        ) : item?.file?.includes("youtube.com") ? (
                            <iframe
                                src={`${item?.file}?controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="none"
                                referrerPolicy="no-referrer"
                                style={{ pointerEvents: "none", objectFit: "cover" }}
                            ></iframe>
                        ) : (
                            <img
                                src={item?.file}
                                alt={item?.file}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </button>

                ))}
            </div>
        </div>
    );
};

export default DetailNewsImgCarousel;