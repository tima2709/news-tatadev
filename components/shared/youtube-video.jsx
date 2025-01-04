import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link"

const YoutubeVideo = ({rubric}) => {
    return (
        <Carousel>
            <h2 className="mb-6">{rubric?.name}</h2>
            <CarouselContent className="flex">
                {rubric.news.map((news, idx) => (
                    <CarouselItem key={idx} className="flex-shrink-0 pl-4">

                        <div className="rounded-[28px] overflow-hidden">
                            <iframe
                                height="472"
                                width="100%"
                                src={news?.video_link}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

                            </iframe>
                        </div>
                        <Link href={`/news-detail/${news.slug}`}>
                            <h3 className="mt-4 hover:text-[#1757B9] duration-200 text-[#101828]">{news.title}</h3>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-5 right-12 md:flex hidden"/>
            <CarouselNext className="top-5 right-0 md:flex hidden"/>
        </Carousel>
    );
};

export default YoutubeVideo;


